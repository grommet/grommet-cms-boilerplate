import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Image from 'grommet/components/Image';

const CLASS_ROOT = "grommet-cms-header";

export default function Nav({
  onLogoutClick,
  leftAnchor,
  navLinks,
  title,
  logo,
  pageMenu
}) {
  const titleElement = (title || logo) ? (
    <Anchor
      style={{ display: 'flex', alignItems: 'center' }}
      animateIcon={typeof logo !== 'undefined'}
      align="center"
      icon={logo}
      path="/dashboard/homepage"
      label={
        <Heading
          style={{ margin: '0px 0px 0 10px' }}
          strong
          tag="h4"
        >
          {title}
        </Heading>
      }
    />
  ) : null;
  return (
    <Header
      className={CLASS_ROOT}
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      colorIndex="neutral-1"
      align="center"
      size="small"
    >
      {leftAnchor ?
        <Box>
          {leftAnchor}
        </Box>
      :
        <Box direction="row" align="center">
          {titleElement}
        </Box>
      }
      <Box direction="row" responsive={false} align="center"
        pad={{ between: 'medium' }}>
        <Menu label="Menu" inline={true} direction="row">
          {pageMenu && pageMenu.length &&
            <Menu label="Pages">
              {pageMenu.map((item, i) =>
                <Anchor
                  key={i}
                  label={item.label}
                  path={`/dashboard/posts/${item.slug}`}
                />
              )}
            </Menu>
          }
          {navLinks && navLinks.map((item, i) =>
            <Anchor
              key={i}
              path={item.path}
              label={item.label}
            />
          )}
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
  onLogoutClick: PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  logo: React.PropTypes.element,
  navLinks: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      path: React.PropTypes.string.isRequired
    })
  ).isRequired
};
