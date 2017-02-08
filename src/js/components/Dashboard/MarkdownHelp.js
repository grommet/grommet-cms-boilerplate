import React from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';

export default function index(props) {
  return (
    <Box direction="column" className="markdown-guide">
      <Header>
        <Heading tag="h2" margin="none">
          Markdown Guide
        </Heading>
      </Header>

      <Heading className="markdown-guide__title" tag="h3" margin="none" strong={true}>
        Headings
      </Heading>
      <hr/>
      <p>
        # h1<br/>
        ## h2<br/>
        ### h3
      </p>
      <Box className="press-post markdown">
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
      </Box>

      <Heading className="markdown-guide__title markdown-guide__title--pad" tag="h4" margin="none" strong={true}>
        Emphasis
      </Heading>
      <hr/>
      <p>
        **Strong**<br/>
        *Publication Source*<br/>
        > “This is a blockquote.”
      </p>
      <Box className="press-post markdown">
        <p><strong>Strong</strong></p>
        <p><em>Publication Source</em></p>
        <blockquote>
          <p>“This is a blockquote.”</p>
        </blockquote>
      </Box>

      <Heading className="markdown-guide__title markdown-guide__title--pad" tag="h4" margin="none" strong={true}>
        Images
      </Heading>
      <hr/>
      <p>
        ![alt text](https://unsplash.it/200/300/?random)
      </p>
      <Box className="press-post markdown">
        <img src="/img/investments/kean-io-logo.png" alt="Keen IO" />
      </Box>

      <Heading className="markdown-guide__title markdown-guide__title--pad" tag="h4" margin="none" strong={true}>
        Links
      </Heading>
      <hr/>
      <p>
        [link text](http://my-url.com)
      </p>
      <Box className="press-post markdown">
        <a href="#" alt="Keen IO">link text</a>
      </Box>

    </Box>
  );
}
