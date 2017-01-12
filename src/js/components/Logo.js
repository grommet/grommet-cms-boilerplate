// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';

const Logo = ({ size = 'large' }) => {
  return (
    <GrommetIcon size={size} colorIndex="brand" />
  );
};

export default Logo;
