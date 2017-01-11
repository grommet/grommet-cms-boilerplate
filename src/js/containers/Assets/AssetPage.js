import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitAsset, getAsset, assetsError } from './actions';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Image from 'grommet/components/Image';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TrashIcon from 'grommet/components/icons/base/Trash';
import DocumentIcon from 'grommet/components/icons/base/Document';
import { isImage } from 'grommet-cms/utils';

export class AssetPage extends Component {
  constructor(props) {
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

  componentWillReceiveProps(nextProps) {
    const { title, path, _id } = nextProps.posts;
    if (title)
      this.setState({
        title,
        path,
        id: _id
      });
  }

  _onChange(event) {
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

  _onSubmit(formData) {
    if (formData.hasOwnProperty('file') || formData.hasOwnProperty('id') ) {
      const dataToSubmit = Object.assign({}, formData);
      this.props.dispatch(submitAsset(dataToSubmit));
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
          <Button onClick={this._onSubmit.bind(this, this.state)} primary={true} label="Submit" />
        </FormFields>
      </Form>
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

export default connect(mapStateToProps)(AssetPage);
