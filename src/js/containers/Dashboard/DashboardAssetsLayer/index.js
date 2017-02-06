/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Search from 'grommet/components/Search';
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
  static renderAssetsList({ onAssetSelect }, searchTerm) {
    return (
      <Article
        className="dashboard--assets-layer"
        primary
        full
        pad="medium"
        style={{ maxHeight: '90vh' }}
      >
        <AssetsList
          searchTerm={searchTerm}
          onAssetSelect={onAssetSelect}
          tileSize="small"
        />
      </Article>
    );
  }

  static renderSearch(onSearch) {
    return (
      <Box>
        <Search
          inline
          placeHolder="Start typing to search assets by title..."
          onDOMChange={onSearch}
        />
      </Box>
    );
  }

  state: {
    addNewAsset: boolean,
    searchTerm: string
  };

  _onAssetFormSubmit: () => void;
  _onAddAssetClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      addNewAsset: false,
      searchTerm: ''
    };

    this._onAssetFormSubmit = this._onAssetFormSubmit.bind(this);
    this._onAddAssetClick = this._onAddAssetClick.bind(this);
    (this:any)._onSearch = this._onSearch.bind(this);
    (this:any)._onAssetFormCancel = this._onAssetFormCancel.bind(this);
  }

  _onSearch(e: any) {
    const { value } = e.target;
    this.setState({
      searchTerm: value || ''
    });
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

  _onAssetFormCancel() {
    this.setState({ addNewAsset: false });
  }

  render() {
    const assetForm = (this.state.addNewAsset)
      ?
      <Article
        full
        align="center"
        justify="center"
        style={{ overflow: 'scroll' }}
      >
        <AssetForm
          isLayer
          hasHeader={false}
          params={{ id: 'create' }}
          onCancel={this._onAssetFormCancel}
          onSubmit={this._onAssetFormSubmit}
        />
      </Article>
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
        {!this.state.addNewAsset && DashboardAssetsLayer.renderSearch(this._onSearch)}
        {assetForm}
        {!this.state.addNewAsset && DashboardAssetsLayer.renderAssetsList(this.props, this.state.searchTerm)}
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
