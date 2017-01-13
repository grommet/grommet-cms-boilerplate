import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Image from 'grommet/components/Image';

const CLASS_ROOT = "grommet-cms-header";

export default function Nav({ onLogoutClick, leftAnchor }) {
  return (
    <Header
      className={CLASS_ROOT}
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      colorIndex="neutral-4"
      align="center"
      size="small"
    >
      {leftAnchor ?
        <Box>
          {leftAnchor}
        </Box>
      :
        <Heading tag="h4" strong={true} margin="none">
          Grommet CMS Dashboard
        </Heading>
      }
      <Box direction="row" responsive={false} align="center"
        pad={{ between: 'medium' }}>
        <Menu label="Menu" inline={true} direction="row">
          <Anchor path="/dashboard/posts" label="Posts" />
          <Anchor path="/dashboard/assets" label="Assets" />
          <Anchor path="/dashboard/users" label="Users" />
        </Menu>
        <Menu responsive={true}
          inline={false}
          dropAlign={{ right: 'right'}}
          icon={
            <Image
              src="/img/dashboard/user-thumb.jpg"
              style={{
                borderRadius: 25,
                width: '25px',
                height: '25px'
              }}
            />
          }>
          <Anchor onClick={onLogoutClick}>
            Sign Out
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );
};

Nav.propTypes = {
  leftAnchor: PropTypes.node,
  onLogoutClick: PropTypes.func.isRequired
};
