import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Image from 'grommet/components/Image';

const CLASS_ROOT = "grommet-cms-header";

export default function Nav({ onLogoutClick }) {
  return (
    <Header
      className={CLASS_ROOT} 
      justify="between" 
      pad={{ horizontal: 'medium', vertical: 'none' }}
      colorIndex="accent-2"
      align="center"
      size="small">
      <Heading tag="h4" strong={true} margin="none">
        Grommet CMS Dashboard
      </Heading>

      <Box direction="row" responsive={false} align="center"
        pad={{ between: 'medium' }}>
        <Menu label="Menu" inline={true} direction="row">
          <Anchor path="/dashboard/homepage" label="Home Page" />
          <Anchor path="/dashboard/press-releases" label="Press Releases" />
          <Anchor path="/dashboard/users" label="Users" />
          <Anchor onClick={onLogoutClick} label="Sign Out" />
        </Menu>

        <Image 
          src="/img/dashboard/user-thumb.jpg" 
          style={{
            borderRadius: 25,
            width: '25px',
            height: '25px'
          }}
        />
      </Box>
    </Header>
  );
};
