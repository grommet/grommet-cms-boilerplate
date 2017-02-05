import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';

export default function BlockCarousel ({ carousel }) {
  const slides = carousel.map((slide, index) =>
    <Box key={`slide-${index}`}>
      <Box
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: 500, width: '100vw' }}
        texture={slide.image.path}
      />
    </Box>
  );

  return (
    <Carousel>
      {slides}
    </Carousel>
  );
};

BlockCarousel.propTypes = {
  carousel: PropTypes.array
};
