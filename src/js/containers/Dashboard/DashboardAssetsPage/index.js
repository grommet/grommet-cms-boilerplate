// @flow
import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Search from 'grommet/components/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AssetsList } from 'grommet-cms/containers';
import { PageHeader, AssetFilterLayer } from 'grommet-cms/components';
import type { DashboardAssetsPageProps, DashboardAssetsPageState } from './flowTypes';
import * as ActionCreators from './actions';

export class DashboardAssetsPage extends Component {
  props: DashboardAssetsPageProps;
  state: DashboardAssetsPageState;
  constructor() {
    super();
    (this:any)._onSearch = this._onSearch.bind(this);
    (this:any)._onToggleForm = this._onToggleForm.bind(this);
    this.state = {
      searchTerm: ''
    };
  }

  _onSearch(event: Event) {
    this.setState({
      searchTerm: event.target.value || ''
    });
  }
  
  _onToggleForm() {
    this.props.actions.toggleForm();
  }
  
  render() {
    const {
      layerVisible,
      form
    } = this.props;
    return (
      <Box full="horizontal">
        <PageHeader
          fixed={false}
          title="Assets"
          controls={
            <Button path="/dashboard/asset/create">
              Add Asset
            </Button>
          }
        />
        <Box direction="row" align="start">
          <Box flex>
            <Search
              inline
              placeHolder="Start typing to search assets by title..."
              onDOMChange={this._onSearch}
            />
          </Box>
          <AssetFilterLayer
            form={form}
            layerVisible={layerVisible}
            onToggle={this._onToggleForm}
          />
        </Box>
        <Article
          className="dashboard--assets-page"
          primary 
          full
          align="center" 
          style={{ overflow: 'scroll' }}
        >
          <AssetsList
            searchTerm={this.state.searchTerm}
            tileSize="medium"
          />
        </Article>
      </Box>
    );
  }
};

/* $FlowFixMe */
export default connect(
  state => ({
    layerVisible: state.assetsPage.layerVisible,
    form: state.assetsPage.form
  }),
  dispatch => ({
    actions: bindActionCreators(
      ActionCreators,
      dispatch
    )
  })
)(DashboardAssetsPage);
