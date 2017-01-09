import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';

const Block = ({ title, onClick, wireframe }) => 
  <Button onClick={onClick}>
    <Box align="center" pad={{ vertical: 'small', horizontal: 'medium' }}>
      <Box size={{ height: 'small', width: 'small' }} colorIndex="grey-4"
        pad={{
          horizontal: 'medium',
          vertical: 'small'
        }} justify="center">
        {wireframe}
      </Box>
      <Heading tag="h3">
        {title}
      </Heading>
    </Box>
  </Button>;

export default function BlockSelector ({ onClick, blockMap }) {
  const blocks = Object.keys(blockMap).map((block, index) =>
   <Block title={blockMap[block].name} onClick={onClick.bind(this, block)}
      wireframe={blockMap[block].wireframe}
      key={`block-${index}`}
    />
  );

  return (
    <Box full="horizontal">
      <Box pad="medium" colorIndex="light-2">
        <Box direction="row" wrap={true} justify="center">
          {blocks}
        </Box>
      </Box>
    </Box>
  );
};

BlockSelector.propTypes = {
  onClick: PropTypes.func.isRequired
};

