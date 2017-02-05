import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAssets,
  deleteAsset,
  assetsIncrementPage,
  getAssetsTotalCount,
  assetsClearPosts
} from 'grommet-cms/containers/Assets/actions';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import SpinningIcon from 'grommet/components/icons/Spinning';
import { AssetTile } from 'grommet-cms/components/Dashboard';

export class DashboardAssetsPage extends Component {
  constructor() {
    super();
    this._handleMore = this._handleMore.bind(this);
  }

  componentWillMount() {
    const { currentPage } = this.props;
    const page = currentPage || 1;
    this.props.dispatch(getAssets(page));
    this.props.dispatch(getAssetsTotalCount());
  }

  componentWillUnmount() {
    this.props.dispatch(assetsClearPosts());
  }

  componentWillReceiveProps({ currentPage }) {
    if (currentPage && currentPage > this.props.currentPage) {
      this.props.dispatch(getAssets(currentPage, false));
    }
  }

  _onDeleteClick(id: string) {
    this.props.dispatch(deleteAsset(id));
  }

  _handleMore() {
    const { currentPage, totalCount, perPage, assets } = this.props;
    if (totalCount > currentPage * perPage) {
      if (assets && assets.length) {
        this.props.dispatch(assetsIncrementPage());
      }
    }
  }

  _renderLoader(request) {
    return (request)
      ? <SpinningIcon />
      : <Box pad="medium">
          <Heading tag="h2">
            Click 'Add Asset' to add your first asset.
          </Heading>
        </Box>;
  }

  render() {
    const { request, assets, totalCount, tileSize, onAssetSelect } = this.props;
    const hasMore = assets && assets.length && assets.length < totalCount;
    const assetBlocks = (assets.length > 0 && !request)
      ? assets.map(({_id, title, path}) =>
        <AssetTile
          key={`asset-${_id}`}
          id={_id}
          onClick={onAssetSelect ? onAssetSelect.bind(this, { _id, title, path }) : null}
          size={tileSize || 'small'}
          onDeleteClick={this._onDeleteClick.bind(this, _id)}
          title={title}
          path={path} />)
      : this._renderLoader(request);


    return (
      <List onMore={hasMore ? () => this._handleMore() : null}>
        <Box
          align="center"
          full="horizontal"
          direction="row"
          wrap={true}
          justify="center"
          pad={{ horizontal: 'medium', vertical: 'medium' }}
        >
          {assetBlocks}
        </Box>
      </List>
    );
  }
};

function mapStateToProps(state, props) {
  const { error, posts: assets, request, currentPage, perPage, totalCount } = state.assets;
  return {
    error,
    currentPage,
    totalCount,
    perPage,
    assets,
    request
  };
}

export default connect(mapStateToProps)(DashboardAssetsPage);
