//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets, deleteAsset } from './actions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import SpinningIcon from 'grommet/components/icons/Spinning';
import { AssetTile } from '../../components/Dashboard';

export class AssetsPage extends Component {
  props: {
    dispatch: Function,
    post: Array<Asset>,
    request: boolean,
    error: string
  }

  componentWillMount() {
    this.props.dispatch(getAssets());
  }

  _onDeleteClick(id: string) {
    this.props.dispatch(deleteAsset(id));
  }

  render() {
    const { post: assets } = this.props;
    const assetBlocks = (assets.length > 0)
      ? assets.map(({_id, title, path}) => 
        <AssetTile 
          key={`asset-${_id}`} 
          id={_id}
          onDeleteClick={this._onDeleteClick.bind(this, _id)}
          title={title} 
          path={path} />)
      : <SpinningIcon />;

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
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
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
