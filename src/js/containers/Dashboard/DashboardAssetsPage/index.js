import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { AssetsList } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components/Dashboard';

export class DashboardAssetsPage extends Component {
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
        <Article
          className="dashboard--assets-page"
          primary 
          full 
          align="center" 
          style={{ overflow: 'scroll' }}
        >
          <AssetsList tileSize="medium" />
        </Article>
      </Box>
    );
  }
};

export default DashboardAssetsPage;
