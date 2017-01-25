/* @flow */
import React from 'react';
import Heading from 'grommet/components/Heading';
import colorConvertor from './colorConversion';

export default function ColorTypeList(props: {
  color: {
    name: string,
    hex: string
  }
}) {
  const { color } = props;
  const { hex, rgb, cmyk } = colorConvertor(color.hex);
  return (
    <ul style={{ listStyle: 'none', marginLeft: 0 }}>
      <li>
        <Heading tag="h4" strong>
          {color.name || 'No Name'}
        </Heading>
      </li>
      <li>
        <Heading tag="h5" margin="none">
          {`CMYK ${cmyk || 'N/A'}`}
        </Heading>
      </li>
      <li>
        <Heading tag="h5" margin="none">
          {`RGB ${rgb || 'N/A'}`}
        </Heading>
      </li>
      <li>
        <Heading tag="h5" margin="none">
          {`HEX ${hex || 'N/A'}`}
        </Heading>
      </li>
    </ul>
  );
}

