import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets, deleteAsset } from './actions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import SpinningIcon from 'grommet/components/icons/Spinning';
import { AssetTile } from 'grommet-cms/components/Dashboard';

export class AssetsPage extends Component {
  componentWillMount() {
    this.props.dispatch(getAssets());
  }

  _onDeleteClick(id: string) {
    this.props.dispatch(deleteAsset(id));
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
    const { post: assets, request } = this.props;
    const assetBlocks = (assets.length > 0 && !request)
      ? assets.map(({_id, title, path}) =>
        <AssetTile
          key={`asset-${_id}`}
          id={_id}
          onDeleteClick={this._onDeleteClick.bind(this, _id)}
          title={title}
          path={path} />)
      : this._renderLoader(request);


    return (
      <Box full="horizontal" align="center">
        <Box colorIndex="light-2" full="horizontal" direction="row"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}>
          <Heading tag="h4" strong={true} margin="none">
            Assets
          </Heading>
          <Button path="/dashboard/asset/create">
            Add Asset
          </Button>
        </Box>
        <Box size={{ width: 'xxlarge' }} direction="row" wrap={true} justify="center"
          pad={{ horizontal: 'medium', vertical: 'medium' }}>
          {assetBlocks}
        </Box>
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { error, posts: post, request } = state.assets;
  return {
    error,
    post,
    request
  };
}

export default connect(mapStateToProps)(AssetsPage);
