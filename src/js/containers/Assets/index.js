// @flow
import React from 'react';
import Footer from 'grommet/components/Footer';
import Section from 'grommet/components/Section';
import ImageIcon from 'grommet/components/icons/base/Image';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
// $FlowFixMe required module not found error
import DashboardAssetsLayer from 'grommet-cms/containers/Dashboard/DashboardAssetsLayer'; // eslint-disable-line
import type { Asset } from './flowTypes';

type AssetUploadState = {
  assetLayer: boolean
};

type AssetUploadProps = {
  onAssetSelect: (asset: Asset) => void
};

export default class AssetUpload extends React.Component {
  state: AssetUploadState;
  props: AssetUploadProps;
  constructor() {
    super();
    // $FlowFixMe
    this._toggleAssetsLayer = this._toggleAssetsLayer.bind(this);
    // $FlowFixMe
    this._renderAssetLayer = this._renderAssetLayer.bind(this);
    // $FlowFixMe
    this._onAssetSelect = this._onAssetSelect.bind(this);
    this.state = {
      assetLayer: false
    };
  }

  _renderAssetLayer() {
    if (this.state.assetLayer) {
      return (
        <DashboardAssetsLayer
          onAssetSelect={this._onAssetSelect}
          onClose={this._toggleAssetsLayer}
        />
      );
    }
    return null;
  }

  _toggleAssetsLayer() {
    this.setState({
      assetLayer: !this.state.assetLayer
    });
  }

  _onAssetSelect(asset: Asset) {
    this.props.onAssetSelect(asset);
    this.setState({ assetLayer: false });
  }

  render() {
    return (
      <Section>
        {this._renderAssetLayer()}
        <Footer
          className="dashboard__post-form__button-row"
          align="center"
          pad={{ horizontal: 'medium' }}
        >
          <Box align="start">
            <Button icon={<ImageIcon />} onClick={this._toggleAssetsLayer}>
              Add Asset
            </Button>
          </Box>
        </Footer>
      </Section>
    );
  }
};
