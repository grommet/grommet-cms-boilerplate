/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import AssetForm from 'grommet-cms/containers/Dashboard/DashboardAssetPage';
import { AssetsList } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components';
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';
import { getAssets } from 'grommet-cms/containers/Assets/actions';

type Props = {
  error: string,
  assets: Array<Asset>,
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
    const assetForm = (this.state.addNewAsset)
      ?
      <AssetForm
        params={{ id: 'create' }}
        onSubmit={this._onAssetFormSubmit}
      />
      : undefined;

    return (
      <Layer align="center" flush={true} onClose={this.props.onClose}>
        <PageHeader
          title="Assets"
          controls={
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
        <Article
          className="dashboard--assets-layer"
          primary
          full
          pad="medium"
          style={{ maxHeight: '90vh' }}
        >
          <AssetsList
            onAssetSelect={this.props.onAssetSelect}
            tileSize="small"
          />
        </Article>
      </Layer>
    );
  }
};

function mapStateToProps(state, props) {
  const { error } = state.assets;
  return {
    error
  };
}

export default connect(mapStateToProps)(DashboardAssetsLayer);
