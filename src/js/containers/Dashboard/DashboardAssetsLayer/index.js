import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAssets } from 'grommet-cms/containers/Assets/actions';

import Layer from 'grommet/components/Layer';
import { AssetTile } from 'grommet-cms/components/Dashboard';

export class DashboardAssetsLayer extends Component {
  componentDidMount() {
    this.props.dispatch(getAssets());
  }
  render() {
    const assets = this.props.posts.map((asset) => 
      <AssetTile asset={asset} key={`asset-${asset._id}`} />);
    return (
      <Layer>
        {assets}
      </Layer>
    );
  }
};

function mapStateToProps(state, props) {
  const { posts } = state.assets;
  return {
    posts
  };
}

export default connect(mapStateToProps)(DashboardAssetsLayer);
