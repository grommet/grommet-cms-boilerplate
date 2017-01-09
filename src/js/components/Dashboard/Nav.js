import React from 'react';
import { Link } from 'react-router';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';

export default function Nav(props) {
  return (
    <Header className="dashboard__nav" justify="between" pad="medium">
      <Title>
        Grommet CMS Dashboard
      </Title>

      <Menu label="Menu" inline={true} direction="row">
        <Menu label="Pages">
          <Link to="/dashboard/homepage">Home Page</Link>
          <Link to="/dashboard/press-releases">Press Releases</Link>
        </Menu>
        <Link to="/dashboard/users">Users</Link>
        <a onClick={props.onLogoutClick} >Sign Out</a>
      </Menu>
    </Header>
  );
};
