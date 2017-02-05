import React from 'react';
import {
  ImageForm,
  ParagraphForm,
  QuoteForm,
  VideoForm,
  CarouselForm,
  CardForm
} from 'grommet-cms/containers/Dashboard/DashboardBlockForm';
import {
  BlockHeading,
  BlockHeadingWireframe,
  BlockParagraph,
  BlockParagraphWireframe,
  BlockImage,
  BlockImageWireframe,
  BlockCard,
  BlockCardWireframe,
  BlockQuote,
  BlockQuoteWireframe,
  BlockVideo,
  BlockVideoWireframe,
  BlockCarousel,
  BlockCarouselWireframe,
  GenericPreview,
  BlockColorSwatch,
  BlockColorSwatchForm,
  BlockColorSwatchWireframe,
  BlockBox,
  BlockBoxForm,
  BlockBoxWireframe
} from './index';

export default {
  BlockBox: {
    element: <BlockBox />,
    preview: <GenericPreview />,
    form: <BlockBoxForm />,
    name: 'Box',
    wireframe: <BlockBoxWireframe />
  },
  BlockParagraph: {
    element: <BlockParagraph />,
    preview: <GenericPreview />,
    form: <ParagraphForm />,
    name: 'Paragraph',
    wireframe: <BlockParagraphWireframe />
  },
  BlockHeading: {
    element: <BlockHeading />,
    preview: <GenericPreview />,
    form: <ParagraphForm />,
    name: 'Heading',
    wireframe: <BlockHeadingWireframe />
  },
  BlockImage: {
    element: <BlockImage />,
    preview: <GenericPreview />,
    form: <ImageForm />,
    name: 'Image',
    wireframe: <BlockImageWireframe />
  },
  BlockCardParagraph: {
    element: <BlockCard />,
    preview: <GenericPreview />,
    form: <CardForm />,
    name: 'Card',
    wireframe: <BlockCardWireframe />
  },
  BlockQuote: {
    element: <BlockQuote />,
    preview: <GenericPreview />,
    form: <QuoteForm />,
    name: 'Quote',
    wireframe: <BlockQuoteWireframe />
  },
  BlockVideo: {
    element: <BlockVideo />,
    preview: <GenericPreview />,
    form: <VideoForm />,
    name: 'Video',
    wireframe: <BlockVideoWireframe />
  },
  BlockCarousel: {
    element: <BlockCarousel />,
    preview: <GenericPreview />,
    form: <CarouselForm />,
    name: 'Carousel',
    wireframe: <BlockCarouselWireframe />
  },
  BlockColorSwatch: {
    element: <BlockColorSwatch />,
    name: 'Color Swatch',
    preview: <GenericPreview />,
    form: <BlockColorSwatchForm />,
    wireframe: <BlockColorSwatchWireframe />
  }
};
