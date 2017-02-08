import React, { Component, PropTypes } from 'react';
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
import { AssetTile, WithLoading } from 'grommet-cms/components';
import { highlightContent, uuid } from 'grommet-cms/utils';

export class DashboardAssetsPage extends Component {
  constructor() {
    super();
    this._handleMore = this._handleMore.bind(this);
    this._renderNoAssetsFound = this._renderNoAssetsFound.bind(this);
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

  componentWillReceiveProps({ currentPage, searchTerm }) {
    if (searchTerm !== '' && searchTerm !== this.props.searchTerm) {
      this.props.dispatch(assetsClearPosts());
      this.props.dispatch(getAssets(0, false, searchTerm));
    } else if (currentPage && currentPage > this.props.currentPage) {
      this.props.dispatch(getAssets(currentPage, false));
    }
  }

  _onDeleteClick(id: string) {
    this.props.dispatch(deleteAsset(id));
  }

  _handleMore() {
    const { currentPage, totalCount, perPage, assets, searchTerm } = this.props;
    if (totalCount > currentPage * perPage) {
      if (assets && assets.length) {
        if (!searchTerm) {
          this.props.dispatch(assetsIncrementPage());
        }
      }
    }
  }

  _renderNoAssetsFound() {
    const { searchTerm, request, assets } = this.props;
    if (request || assets.length) {
      return null;
    }
    return (
      <Box pad="medium">
        <Heading tag="h2">
          {searchTerm
            ? `No assets found for search term ${searchTerm}`
            : "Click 'Add Asset' to add your first asset."
          }
        </Heading>
      </Box>
    );
  }

  render() {
    const { request, assets, totalCount, tileSize, onAssetSelect, searchTerm } = this.props;
    const hasMore = assets && assets.length && assets.length < totalCount;
    const term = searchTerm || '';
    let filteredAssets = [];
    if (Array.isArray(assets)) {
      filteredAssets = term !== ''
        ? assets.map(item => ({ _id: item._id, title: item.title, path: item.path }))
          .filter(item => item.title.toLowerCase().includes(term.toLowerCase()))
        : assets.map(item => ({ _id: item._id, title: item.title, path: item.path }));
    }
    const assetBlocks = (filteredAssets.length > 0)
      && filteredAssets.map(({ _id, title, path }) =>
        <AssetTile
          key={`asset-${_id}-${uuid()}`}
          id={_id}
          onClick={onAssetSelect ? onAssetSelect.bind(this, { _id, title, path }) : null}
          size={tileSize || 'small'}
          onDeleteClick={this._onDeleteClick.bind(this, _id)}
          title={term !== '' ? highlightContent(term, title) : title}
          path={path}
        />
      );


    return (
      <WithLoading isLoading={request}>
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
          {this._renderNoAssetsFound()}
        </List>
      </WithLoading>
    );
  }
};

DashboardAssetsPage.propTypes = {
  searchTerm: PropTypes.string,
  request: PropTypes.bool.isRequired,
  assets: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  tileSize: PropTypes.string,
  onAssetSelect: PropTypes.func
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
