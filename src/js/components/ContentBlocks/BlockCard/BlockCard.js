import React, { Component, PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';

import CirclePlayIcon from 'grommet/components/icons/base/CirclePlay';
import { YoutubeLayer } from '../Shared';

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
    const { card, image } = this.props;
    const { heading, label, linkText, linkUrl, content } = card;

    const videoLayer = (this.state.layerActive)
      ? <YoutubeLayer url={this.state.layerContent} 
          onClose={this._toggleVideoLayer} />
      : undefined;

    const anchor = (this._isLinkVideo(linkUrl))
      ? <Anchor label={linkText} primary={true} icon={<CirclePlayIcon />}
          onClick={this._toggleVideoLayer.bind(this, linkUrl)} />
      : <Anchor label={linkText} primary={true} href={linkUrl} />;

    return (
      <div>
        {videoLayer}
        <Card
          thumbnail={image.path}
          label={label}
          description={content}
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
      </div>
    );
  }
};

BlockCard.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string
  })
};
