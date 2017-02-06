import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Search from 'grommet/components/Search';
import { AssetsList } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components/Dashboard';

export class DashboardAssetsPage extends Component {
  constructor() {
    super();
    this._onSearch = this._onSearch.bind(this);
    this.state = {
      searchTerm: ''
    };
  }

  _onSearch({ target }) {
    this.setState({
      searchTerm: target.value || ''
    });
  }
  
  render() {
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
        <Box>
          <Search
            inline
            placeHolder="Start typing to search assets by title..."
            onDOMChange={this._onSearch}
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

export default DashboardAssetsPage;
