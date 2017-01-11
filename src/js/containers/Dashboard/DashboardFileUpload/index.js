import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { fileInsert, fileUpload, fileError } from './actions';

import Button from 'grommet/components/Button';
import Image from 'grommet/components/icons/base/Image';
import FileInsertLayer from '../../../components/Dashboard/FileInsertLayer';

export class DashboardFileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: ''
    };

    this._onUploadFileClick = this._onUploadFileClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onUploadFileClick(event) {
    this.props.dispatch(fileInsert(true));
  }

  _onLayerClose() {
    this.props.dispatch(fileInsert(false));
  }

  _onChange(event) {
    this.setState({file: event.target.files[0]});
  }

  _onSubmit(event) {
    if (this.state.file !== '') {
      const formData = {file: this.state.file};
      this.props.dispatch(fileUpload(formData));
    } else {
      this.props.dispatch(fileError('A file must be selected.'));
    }
  }

  render() {
    let layer = (this.props.insertRequest)
      ? <FileInsertLayer
          onLayerClose={this._onLayerClose}
          onSubmit={this._onSubmit}
          error={this.props.error}
          onChange={this._onChange}
          request={this.props.uploadRequest}
        />
      : null;

    return (
      <div>
        {layer}
        <Button onClick={this._onUploadFileClick} icon={<Image />}>Add File</Button>
      </div>
    );
  }
};

DashboardFileUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onImgPost: PropTypes.func
};

function mapStateToProps(state, props) {
  const { insertRequest, uploadRequest, error, url } = state.fileUpload;

  return {
    insertRequest,
    uploadRequest,
    error,
    url
  };
}

export default connect(mapStateToProps)(DashboardFileUpload);
