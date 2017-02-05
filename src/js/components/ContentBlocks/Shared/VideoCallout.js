import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import PlayIcon from 'grommet/components/icons/base/CirclePlay';

export default function VideoCallout ({ label, onClick, description, thumbnail }) {
  return (
    <Box
      pad={{horizontal: 'medium', vertical: 'small'}}
    >
      {label && <Label uppercase={true}>{label}</Label>}
      <Box
        full="horizontal"
        align="center"
        justify="center"
        style={{ height: 377, backgroundPosition: '50% 50%'  }}
        texture={thumbnail}
        onClick={onClick}
      >
        <PlayIcon size="xlarge" colorIndex="brand" />
      </Box>
      {description &&
        <Heading tag="h5" strong={true} margin="small">
          {description}
        </Heading>
      }
    </Box>
  );
};

VideoCallout.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  thumbnail: PropTypes.string
};

VideoCallout.defaultProps = {
  thumbnail: '/img/dashboard/video-thumb.jpg'
};
