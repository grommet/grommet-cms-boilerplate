import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import VideoCallout from 'grommet-cms/components/VideoCallout';
import YoutubeLayer from 'grommet-cms/components/YoutubeLayer';

export default class BlockVideo extends Component {
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

  render() {
    const { content, image, label, linkUrl } = this.props;
    const videoLayer = (this.state.layerActive)
      ? <YoutubeLayer url={this.state.layerContent} 
          onClose={this._toggleVideoLayer} />
      : undefined;

    return (
      <Box>
        {videoLayer}
        <VideoCallout 
          description={content} 
          label={label} 
          thumbnail={image} 
          onClick={this._toggleVideoLayer.bind(this, linkUrl)}
        />
      </Box>
    );
  }
};

BlockVideo.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string,
  label: PropTypes.string,
  linkUrl: PropTypes.string
};
