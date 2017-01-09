import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import PlayIcon from 'grommet/components/icons/base/CirclePlay';

const CLASS_ROOT = 'video-callout';

export default function VideoCallout ({label, onClick, description, thumbnail}) {
  return (
    <Box size={{ width: "xlarge" }} alignSelf="center" 
      pad={{horizontal: 'medium', vertical: 'small'}}>
      <Label uppercase={true}>{label}</Label>
      <Box className={CLASS_ROOT}>
        <Box className={`${CLASS_ROOT}__container`} onClick={onClick}>
          <Box className="video-callout__icon-container" align="center" justify="center">
            <PlayIcon className="video-callout__icon" size="xlarge" colorIndex="brand" />
          </Box>
          <Image src={thumbnail} full="horizontal" />
        </Box>
        <Heading className={`${CLASS_ROOT}__text`} tag="h5" strong={true} margin="small">
          {description}
        </Heading>
      </Box>
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
