import React, { Component, PropTypes } from 'react';
import {
  blockAdd
} from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import ImageIcon from 'grommet/components/icons/base/Image';
import Menu from 'grommet/components/Menu';
import { formatDate } from 'grommet-cms/utils';
import DashboardAssetsLayer from
  'grommet-cms/containers/Dashboard/DashboardAssetsLayer';

export default class MarqueeForm extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._validatePost = this._validatePost.bind(this);
    this._setHeroImage = this._setHeroImage.bind(this);
    this._onCreateBlockClick = this._onCreateBlockClick.bind(this);
    this._setShouldUpdateHero = this._setShouldUpdateHero.bind(this);
    this._toggleAssetsLayer = this._toggleAssetsLayer.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);

    this.state = {
      shouldUpdateHero: false,
      assetsLayer: false
    };
  }

  componentWillReceiveProps({ url }) {
    if (url !== this.props.url && this.state.shouldUpdateHero) {
      this.setState({
        shouldUpdateHero: false
      });
      this._setHeroImage(url);
    }
  }

  _toggleAssetsLayer() {
    this.setState({ assetsLayer: !this.state.assetsLayer });
  }

  _setHeroImage(url) {
    this.props.onChange({
      target: {
        id: 'image',
        value: url
      }
    });
  }

  _setShouldUpdateHero() {
    this.setState({
      shouldUpdateHero: true
    });
  }

  _onCreateBlockClick() {
    this.props.dispatch(blockAdd());
  }

  _onAssetSelect(asset) {
    this.props.onChange({
      target: {
        id: 'image',
        value: asset
      }
    });

    this.setState({ assetsLayer: false });
  }

  _validatePost() {
    const { title, date } = this.props.post;
    return (title && date) ? true : false;
  }

  _onSubmit() {
    if (this._validatePost()) {
      this.props.onSubmit();
    }
  }

  render() {
    const { onChange, post, onCancel } = this.props;
    const { image, title, subtitle, date } = post;
    const formattedDate = formatDate(date);
    const assetsLayer = (this.state.assetsLayer)
      ? <DashboardAssetsLayer
          onAssetSelect={this._onAssetSelect}
          onClose={this._toggleAssetsLayer}
        />
      : undefined;

    return (
      <Box>
        {assetsLayer}
        <Section pad="medium" align="center">
          <Form pad="medium">
            <FormFields>
              <fieldset>
                <FormField label="Title" htmlFor="title">
                  <input
                    autoFocus
                    id="title"
                    name="title"
                    type="text"
                    value={title || ''}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Background Image" htmlFor="image">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={(image && image.path) ? image.path : ''}
                    onChange={onChange}
                  />
                </FormField>
              </fieldset>
            </FormFields>
          </Form>
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
        <Section pad="medium">
          <Footer align="center" justify="center" pad="medium">
            <Menu
              align="center"
              style={{ width: '100%' }}
              justify="between"
              direction="row"
              inline
              responsive={false}
            >
              <Button
                label="submit"
                onClick={this._onSubmit}
                primary={true}
                type="submit"
              />
              <Button
                label="cancel"
                onClick={onCancel}
                primary={false}
              />
            </Menu>
          </Footer>
        </Section>
      </Box>
    );
  }
};

MarqueeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  post: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string
};
