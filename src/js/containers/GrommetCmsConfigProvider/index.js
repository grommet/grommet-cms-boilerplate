/* @flow */
import React from 'react';
import grommetCmsDefaultConfig from './grommetCmsConfig';

type NavLinkType = { 
  label?: string,
  path: string
};

type ConfigurationProps = {
  children?: React$Element<any>,
  config?: { 
    frontend: {
      title: string,
      logo: HTMLElement | React$Element<any>,
      contact: {
        email: string,
        phone: string
      },
      leftNavLinks: Array<NavLinkType>,
      rightNavLinks: Array<NavLinkType>,
    },
    cms: {
      title: string,
      logo: HTMLElement | React$Element<any>,
      navLinks: Array<NavLinkType>
    }
  }
};

export default class GrommetCmsConfigProvider extends React.Component {
  props: ConfigurationProps;
  static childContextTypes = {
    config: React.PropTypes.object.isRequired
  };
  getChildContext() {
    return {
      config: this.props.config || grommetCmsDefaultConfig
    };
  }
  render() {
    return this.props.children;
  }
}
