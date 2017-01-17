/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import { submitAsset, getAsset, assetsError } from 'grommet-cms/containers/Assets/actions';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Image from 'grommet/components/Image';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TrashIcon from 'grommet/components/icons/base/Trash';
import DocumentIcon from 'grommet/components/icons/base/Document';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import { isImage } from 'grommet-cms/utils';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';

type Props = {
  error: string,
  posts: Asset,
  request: boolean
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

    return (
      <Box pad="medium" alignSelf="center">
        <Form onSubmit={this._onSubmit.bind(this, this.state)}>
          <FormFields>
            <fieldset>
              <FormField label="Title (alt text for images)" htmlFor={"title"}>
                <input id={"title"} name="title" type="text"
                  onChange={this._onChange} value={title}/>
              </FormField>
              {preview}
            </fieldset>
            <p>{this.props.error}</p>
            <Button onClick={this._onSubmit.bind(this, this.state)} 
              primary={true} label="Submit" />
          </FormFields>
        </Form>
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
