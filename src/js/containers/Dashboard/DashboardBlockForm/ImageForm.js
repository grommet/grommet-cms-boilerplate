import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import { DashboardFileUpload } from 'grommet-cms/containers';

export class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image || '',
      content: props.content || ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`
      });
    }
  }

  _onChange({ target }) {
    const key = target.id;
    let val = target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _validateForm({ image }) {
    if (image !== '')
      return true;

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { image, content } = this.state;
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    const fileUpload = <DashboardFileUpload />;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
              <FormField label="Description" htmlFor="content">
                <input id="content" name="content" type="text"
                  value={content} onChange={this._onChange} />
              </FormField>
              <FormField label="Image file path" htmlFor="image">
                <input id="image" name="image" type="text"
                  value={image} onChange={this._onChange} />
              </FormField>
              {fileUpload}
            </fieldset>
            <Button onClick={submit} primary={false} type="submit"
              label="Done" />
          </FormFields>
        </Form>
      </Box>
    );
  }
};

ImageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(ImageForm);
