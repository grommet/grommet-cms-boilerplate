import React from 'react';
import GrommetLogo from 'grommet/components/icons/Grommet';

export default {
  frontend: {
    title: 'Grommet CMS',
    logo: <GrommetLogo invert size="small" />,
    favicon: '',
    contact: {
      copyright: '© 2017 Grommet Labs',
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
