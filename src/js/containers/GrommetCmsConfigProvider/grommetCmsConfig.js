import React from 'react';
import BrandHpeStackIcon from 'grommet/components/icons/base/BrandHpeStack';

export default {
  frontend: {
    title: 'HPE Brand Central',
    theme: 'HPE',
    logo: <BrandHpeStackIcon invert size="small" />,
    favicon: '',
    contact: {
      copyright: '© 2017 Hewlett Packard Enterprise',
      email: 'hello@hpe.com',
      phone: '123-456-7890',
      website: 'https://www.hpe.com'
    },
    leftNavLinks: [
    ],
    rightNavLinks: [
    ]
  },
  cms: {
    title: 'Grommet CMS',
    logo: <BrandHpeStackIcon invert size="small" />,
    formLogo: <BrandHpeStackIcon size="large" />,
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
