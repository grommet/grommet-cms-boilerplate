import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';

export default function BlockCarouselPreview ({ carousel }) {
  const slides = carousel.map((slide, index) =>
    <Box key={`slide-${index}`}>
      <Image src={slide.image} full="horizontal" />
    </Box>
  );

  return (
    <Box colorIndex="light-1" direction="row" pad={{ between: 'medium' }}>
      <Carousel>
        {slides}
      </Carousel>
    </Box>
  );
};

BlockCarouselPreview.propTypes = {
  carousel: PropTypes.array
};
