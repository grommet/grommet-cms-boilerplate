import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import { VideoCallout, VideoLayer } from '../Shared';

export default class BlockVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false
    };

    this._toggleVideoLayer = this._toggleVideoLayer.bind(this);
  }

  _toggleVideoLayer() {
    this.setState({ 
      layerActive: !this.state.layerActive
    });
  }

  render() {
    const { content, image, label, video } = this.props;
    const videoLayer = (this.state.layerActive)
      ? <VideoLayer
          image={image}
          video={video}
          onClose={this._toggleVideoLayer}
        />
      : null;

    return (
      <Box>
        {videoLayer}
        <VideoCallout 
          description={content} 
          label={label} 
          thumbnail={image.path} 
          onClick={this._toggleVideoLayer}
        />
      </Box>
    );
  }
};

BlockVideo.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string.isRequired
  }),
  label: PropTypes.string,
  video: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
};
