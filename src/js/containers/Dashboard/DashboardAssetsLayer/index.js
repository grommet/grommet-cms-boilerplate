/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import { AssetTile } from 'grommet-cms/components/Dashboard';
import { getAssets } from 'grommet-cms/containers/Assets/actions';
import AssetForm from 'grommet-cms/containers/Dashboard/DashboardAssetPage';
import { PageHeader } from 'grommet-cms/components';
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';

type Props = {
  error: string,
  posts: Array<Asset>,
  request: boolean
};

export class DashboardAssetsLayer extends Component {
  state: {
    addNewAsset: boolean
  };

  _onAssetFormSubmit: () => void;
  _onAddAssetClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      addNewAsset: false
    };

    this._onAssetFormSubmit = this._onAssetFormSubmit.bind(this);
    this._onAddAssetClick = this._onAddAssetClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getAssets());
  }

  _onAddAssetClick() {
    this.setState({ addNewAsset: true });
  }

  _onAssetFormSubmit() {
    // Refresh Assets list.
    this.props.dispatch((getAssets()))
      .then(() => {
        this.setState({ addNewAsset: false });
      });
  }

  render() {
    const assets = (
      this.props.posts
      && this.props.posts.length > 0
      && !this.state.addNewAsset)
      ? this.props.posts.map(({_id, path, title}) =>
        <AssetTile
          id={_id}
          title={title}
          path={path}
          key={`asset-${_id}`}
          size="small"
          showControls={false}
          onClick={this.props.onAssetSelect.bind(this, {_id, path, title})}
        />)
      : undefined;

    const assetForm = (this.state.addNewAsset)
      ?
      <AssetForm
        params={{ id: 'create' }}
        onSubmit={this._onAssetFormSubmit}
      />
      : undefined;

    return (
      <Layer flush={true} onClose={this.props.onClose}>
        <PageHeader title="Assets" controls={
            <Box direction="row" pad={{ between: 'medium' }}>
              <Button onClick={this._onAddAssetClick}>
                Add Asset
              </Button>
              <Button onClick={this.props.onClose}>
                Exit
              </Button>
            </Box>
          }
        />
        {assetForm}
        <Box full="horizontal" direction="row" pad="medium"
          justify="center" wrap={true}>
          {assets}
        </Box>
      </Layer>
    );
  }
};

function mapStateToProps(state, props) {
  const { error, posts, request } = state.assets;
  return {
    error,
    posts,
    request
  };
}

export default connect(mapStateToProps)(DashboardAssetsLayer);
