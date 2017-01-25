import React, { Component, PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Markdown from 'grommet/components/Markdown';
import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import YoutubeLayer from '../YoutubeLayer';

export default class BlockCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false,
      layerContent: ''
    };

    this._toggleVideoLayer = this._toggleVideoLayer.bind(this);
  }

  _toggleVideoLayer(videoUrl) {
    this.setState({ 
      layerActive: !this.state.layerActive,
      layerContent: videoUrl
    });
  }

  _isLinkVideo(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  render() {
    const { card, content, image } = this.props;
    const { heading, label, linkText, linkUrl } = card;

    const videoLayer = (this.state.layerActive)
      ? <YoutubeLayer url={this.state.layerContent} 
          onClose={this._toggleVideoLayer} />
      : undefined;

    const anchor = (this._isLinkVideo(linkUrl))
      ? <Anchor label={linkText} primary={true} icon={<CirclePlayIcon />}
          onClick={this._toggleVideoLayer.bind(this, linkUrl)} />
      : <Anchor label={linkText} primary={true} href={linkUrl} />;

    return (
      <Box full="horizontal" align="center">
        {videoLayer}
        <Box full="horizontal" align="center">
          <Box direction="row">
            <Box basis="2/3" pad={{horizontal: 'large'}}>
              <Markdown content={content} components={{ 
                'p': { 'props':  { size: 'large', margin: 'small' } },
                'h2': { 'props':  { strong: true } }
              }}/>
            </Box>
            <Box basis="1/3" pad="large">
              <Card
                thumbnail={image.path}
                label={label}
                heading={
                  <Box pad={{vertical: 'small'}}>
                    <Heading tag="h3" strong={true} margin="none">
                      {heading}
                    </Heading>
                  </Box>
                }
                colorIndex="light-2" 
                link={anchor} 
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

BlockCard.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string
};
