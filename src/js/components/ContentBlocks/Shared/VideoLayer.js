import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Video from 'grommet/components/Video';

const CLASS_ROOT = 'video-layer';

export default function VideoLayer ({ video, onClose, image }) {
  return (
    <Layer className={CLASS_ROOT} closer={true} onClose={onClose} flush={true}>
      <Box
        pad="large"
        alignSelf="center"
        style={{ minHeight:'90vh' }}
        align="center"
        justify="center"
      >
        <Box className={`${CLASS_ROOT}__video-container`} full="horizontal">
          <Video
            size="large"
            poster={image.path}
            title={video.title}
            full
          >
            <source src={video.path} />
          </Video>
        </Box>
      </Box>
    </Layer>
  );
};

VideoLayer.propTypes = {
  video: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  image: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};
