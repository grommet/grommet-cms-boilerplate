import React from 'react';
import BrandHpeElementPathIcon from 'grommet/components/icons/base/BrandHpeElementPath';

export default {
  frontend: {
    title: 'HPE Brand Central',
    theme: 'HPE',
    logo: <BrandHpeElementPathIcon invert size="small" />,
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
    logo: <BrandHpeElementPathIcon size="medium" />,
    formLogo: <BrandHpeElementPathIcon colorIndex="plain" size="xlarge" />,
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
