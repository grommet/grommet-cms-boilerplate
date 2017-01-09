import React from 'react';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import NavAnchor from './NavAnchor';

export default function Nav (props) {
  return (
    <Header className="labs__section mobile-hide" size="large"
      justify="between" separator="bottom" pad={{ horizontal: 'medium' }}>
      <Menu inline={true} direction="row" responsive={false}>
        <NavAnchor path="/the-machine" label="The Machine" />
        <NavAnchor path="/next-next" label="Next Next" />
        <NavAnchor path="/news" label="News" />
      </Menu>
      <Menu inline={true} direction="row" responsive={false}
        justify="end">
        <NavAnchor path="/about" label="About Us" />
        <NavAnchor path="/publications" label="Publications" />
        <NavAnchor path="/downloads" label="Downloads" />
      </Menu>
    </Header>
  );
};
