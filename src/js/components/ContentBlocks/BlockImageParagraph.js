import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';
import Section from 'grommet/components/Section';

const LargeBlock = ({content, image, imageDesc}) =>
  <Section full="horizontal" align="center"
    pad={{ horizontal: 'large', vertical: 'small' }}
    alignSelf="center">
    <Box className="labs__offset-image-wrap mobile-hide" full="horizontal" align="center">
      <Box className="labs__image" full="horizontal">
        <Box pad="small" />
        <Box direction="row" justify="end">
          <Box basis="1/2" texture={image}
            size={{ height: 'xlarge' }} />
        </Box>
        <Box direction="row" justify="end">
          <Box basis="1/2" pad={{vertical: 'small'}}>
            <Heading tag="h5" strong={true}>
              {imageDesc}
            </Heading>
          </Box>
        </Box>
      </Box>
    </Box>
    <Box className="labs__section" pad={{ horizontal: 'large' }}>
      <Box className="labs__section" align="start">
        <Box size={{ width: 'medium' }}>
          <Markdown content={content} components={{ 
            'p': { 'props':  { size: 'large', margin: 'small' } },
            'h2': { 'props':  { strong: true } }
          }}/>
        </Box>
      </Box>
    </Box>
  </Section>;

const MediumBlock = ({content, image, imageDesc}) =>
  <Section full="horizontal" align="center"
    pad={{ horizontal: 'large', vertical: 'small' }}
    alignSelf="center">
    <Box className="labs__section" direction="row" pad={{horizontal: 'large'}}>
      <Box basis="1/3">
        <Markdown content={content} components={{ 
          'p': { 'props':  { size: 'large', margin: 'small' } },
          'h2': { 'props':  { strong: true } }
        }}/>
      </Box>
      <Box pad="medium" />
      <Box basis="2/3">
        <Box pad={{ vertical: 'small' }}>
          <Image full="horizontal" src={image} />
        </Box>
        <Box pad={{vertical: 'small'}}>
          <Heading tag="h5" strong={true} margin="none">
            {imageDesc}
          </Heading>
        </Box>
      </Box>
    </Box>
  </Section>;

const SmallBlock = ({content, image, imageDesc}) =>
  <Section full="horizontal" align="center"
    pad={{ horizontal: 'large', vertical: 'small' }}
    alignSelf="center">
    <Box className="labs__section" direction="row" pad={{horizontal: 'large'}}>
      <Box basis="2/3">
        <Markdown content={content} components={{ 
          'p': { 'props':  { size: 'large', margin: 'small' } },
          'h2': { 'props':  { strong: true } }
        }}/>
      </Box>
      <Box pad="medium" />
      <Box basis="1/3">
        <Box pad={{ vertical: 'small' }}>
          <Image full="horizontal" src={image} />
        </Box>
        <Box pad={{vertical: 'small'}}>
          <Heading tag="h5" strong={true} margin="none">
            {imageDesc}
          </Heading>
        </Box>
      </Box>
    </Box>
  </Section>;

export default function BlockImageParagraph ({ content, image, imageDesc, imageSize }) {
  switch(imageSize) {
    case 'Large':
      return <LargeBlock image={image} imageDesc={imageDesc} content={content} />;
      break;
    case 'Medium':
      return <MediumBlock image={image} imageDesc={imageDesc} content={content} />;
      break;
    case 'Small':
      return <SmallBlock image={image} imageDesc={imageDesc} content={content} />;
      break;
    default:
      return <LargeBlock image={image} imageDesc={imageDesc} content={content} />;
      break;
  };
};

BlockImageParagraph.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string,
  imageDesc: PropTypes.string
};
