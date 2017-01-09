import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';

export default function Nav (props) {
  return (
    <Header className="mobile-hide" size="large" colorIndex="neutral-5"
      justify="center" separator="bottom" pad={{ horizontal: 'medium' }}>
      <Box size={{ width: 'xxlarge' }} direction="row" responsive={false}>
        <Menu inline={true} direction="row" responsive={false} align="center">
          <Anchor path="/" icon={<GrommetIcon />} />
          <Anchor path="/posts" label="Posts" />
        </Menu>
      </Box>
    </Header>
  );
};
