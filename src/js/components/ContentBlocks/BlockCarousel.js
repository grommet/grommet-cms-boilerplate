import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';
import Section from 'grommet/components/Section';

export default function BlockCarousel ({ carousel }) {
  const slides = carousel.map((slide, index) =>
    <Box key={`slide-${index}`}>
      <Image src={slide.image} full="horizontal" />
    </Box>
  );

  return (
    <Section className="labs__section mobile-hide" pad={{ vertical: 'medium', horizontal: 'large' }} 
      alignSelf="center">
      <Carousel>
        {slides}
      </Carousel>
    </Section>
  );
};

BlockCarousel.propTypes = {
  carousel: PropTypes.array
};
