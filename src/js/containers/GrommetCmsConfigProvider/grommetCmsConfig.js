import React from 'react';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import GrommetLogo from 'grommet/components/icons/Grommet';

export default {
  frontend: {
    title: '',
    logo: <GrommetIcon size="large" />,
    favicon: '',
    contact: {
      email: 'hello@grommet.io',
      phone: '123-456-7890'
    },
    leftNavLinks: [
      {
        label: 'Posts',
        path: '/posts'
      }
    ],
    rightNavLinks: [
      {
        show: (state) => state.login.loggedIn,
        path: '/dashboard',
        label: 'Dashboard'
      }
    ]
  },
  cms: {
    title: 'Grommet CMS',
    logo: <GrommetLogo invert size="small" />,
    formLogo: <GrommetLogo size="large" />,
    navLinks: [
      {
        path: '/dashboard/posts',
        label: 'Posts'
      },
      {
        path: '/dashboard/assets',
        label: 'Assets'
      },
      {
        path: '/dashboard/users',
        label: 'Users'
      }
    ]
  }
};
