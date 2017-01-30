import React from 'react';
import BrandHpeLabsInsigniaOutlineIcon from 'grommet/components/icons/base/BrandHpeLabsInsigniaOutline';

export default {
  frontend: {
    title: 'HPE Brand Central',
    theme: 'HPE',
    logo: <BrandHpeLabsInsigniaOutlineIcon invert size="small" />,
    favicon: '',
    contact: {
      copyright: '© 2017 Hewlett Packard Enterprise',
      email: 'hello@hpe.com',
      phone: '123-456-7890',
      website: 'https://www.hpe.com'
    }
  },
  cms: {
    title: 'Brand Central CMS',
    logo: <BrandHpeLabsInsigniaOutlineIcon invert size="medium" />,
    formLogo: <BrandHpeLabsInsigniaOutlineIcon colorIndex="plain" size="xlarge" />,
    navLinks: [
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
