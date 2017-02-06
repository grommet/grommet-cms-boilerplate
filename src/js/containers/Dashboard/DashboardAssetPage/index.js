/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Image from 'grommet/components/Image';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TrashIcon from 'grommet/components/icons/base/Trash';
import DocumentIcon from 'grommet/components/icons/base/Document';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Section from 'grommet/components/Section';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import { isImage } from 'grommet-cms/utils';
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';
import {
  submitAsset,
  getAsset,
  assetsError
} from 'grommet-cms/containers/Assets/actions';

type Props = {
  error: string,
  posts: Asset,
  request: boolean,
  hasHeader?: boolean,
  onCancel?: Function,
  isLayer?: boolean
};

export class DashboardAssetPage extends Component {
  state: {
    title: string,
    path: string,
    id: string
  };

  _onChange: () => void;
  _onSubmit: () => void;
  _removeAssetClick: () => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
      path: '',
      id: ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._removeAssetClick = this._removeAssetClick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.params;
    if (id && id !== 'create')
      this.props.dispatch(getAsset(id));
  }

  componentWillReceiveProps(nextProps: Props) {
    const { title, path, _id } = nextProps.posts;
    if (_id)
      this.setState({
        title,
        path,
        id: _id
      });
  }

  _onChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const key = event.target.id;
      const val = (event.target.files)
        ? event.target.files[0]
        : event.target.value;
      let obj = {};
      obj[key] = val;
      this.setState(obj);
    } else {
      throw new Error(`Unexpected event target`);
    }
  }

  _onSubmit(formData: Object) {
    if (formData.hasOwnProperty('file') || formData.hasOwnProperty('id') ) {
      const dataToSubmit = Object.assign({}, formData);
      // If the form is embedded we don't want to forward to the AssetsPage after
      // a successful post.
      const { onSubmit } = this.props;
      const forwardWhenDone = (onSubmit) 
        ? false
        : true;

      this.props.dispatch(submitAsset(dataToSubmit, forwardWhenDone))
        .then(() => {
          if (onSubmit) onSubmit();
        });
    } else {
      this.props.dispatch(assetsError('A file must be selected.'));
    }
  }

  _removeAssetClick() {
    this.setState({
      path: ''
    });
  }

  render() {
    const { title, path } = this.state;
    const thumb = (isImage(path))
      ? <Box pad="medium">
          <Image src={path} size="medium" />
          <Box pad={{ vertical: 'small' }}>
            <Anchor label="Remove Image" icon={<TrashIcon />}
              onClick={this._removeAssetClick} />
          </Box>
        </Box>
      : <Box pad="medium">
          <DocumentIcon size="xlarge" />
          <Box pad={{ vertical: 'small' }}>
            <Anchor label="Remove File" icon={<TrashIcon />}
              onClick={this._removeAssetClick} />
          </Box>
        </Box>;

    const preview = (path)
      ? <FormField label="File" htmlFor={"file"}>
          {thumb}
        </FormField>
      : <FormField label="File - 15MB max" htmlFor={"file"}>
          <input id={"file"} name="file" type="file"
            onChange={this._onChange} />
        </FormField>;

    const hasHeader = this.props.hasHeader != null
      ? this.props.hasHeader
      : true;
    const header = hasHeader
      ?
        (
          <Header size="small" colorIndex="light-2" style={{ maxHeight: 50 }}>
            <Box direction="row" pad={{ horizontal: 'medium' }}>
              <Anchor
                primary
                icon={<LinkPreviousIcon />}
                path="/dashboard/assets"
              >
                All Assets
              </Anchor>
            </Box>
          </Header>
        )
      : null;

    const isRenderedInLayer = this.props.isLayer != null
      ? this.props.isLayer
      : false;

    return (
      <Box full="horizontal">
        {header}
        <Section primary full="horizontal" pad="medium" align="center">
          <Form onSubmit={this._onSubmit.bind(this, this.state)}>
            <FormFields>
              <fieldset>
                <FormField label="Title (alt text for images)" htmlFor={"title"}>
                  <input id={"title"} name="title" type="text"
                    onChange={this._onChange} value={title || ''}/>
                </FormField>
                {preview}
              </fieldset>
              <p>{this.props.error}</p>
            </FormFields>
          </Form>
        </Section>
        <Section pad="medium" align="center">
          <Footer align="center" justify="center" pad="medium">
            <Menu
              align="center"
              justify="between"
              direction="row"
              inline
            >
              <Button
                label="submit"
                primary
                onClick={this.state.title != '' ? this._onSubmit.bind(this, this.state) : null}
                style={{ margin: '0px 8px' }}
                type="submit"
              />
              <Button
                label="cancel"
                style={{ margin: '0px 8px' }}
                onClick={this.props.onCancel || null}
                path={isRenderedInLayer ? '' : '/dashboard/assets'}
                primary={false}
              />
            </Menu>
          </Footer>
        </Section>
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { error, posts, request } = state.assets;
  return {
    error,
    posts,
    request
  };
}

export default connect(mapStateToProps)(DashboardAssetPage);
