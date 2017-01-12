import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

import { DashboardFileUpload } from 'grommet-cms/containers';

export class CardParagraphForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || '',
      image: props.image || '',
      heading: props.card && props.card.heading || '',
      label: props.card && props.card.label || '',
      linkText: props.card && props.card.linkText || '',
      linkUrl: props.card && props.card.linkUrl || ''
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
    if (image !== '' && content !== '')
      return true;

    return false;
  }

  _onSubmit(event) {
    event.preventDefault();
    const state = Object.assign({}, this.state);
    const formData = {
      content: state.content,
      image: state.image,
      card: {
        heading: state.heading,
        label: state.label,
        linkText: state.linkText,
        linkUrl: state.linkUrl
      }
    };

    this.props.onSubmit(formData);
  }

  render() {
    const {
      content, heading, image, label, linkText, linkUrl
    } = this.state;
    const submit = (this._validateForm(this.state))
      ? this._onSubmit
      : undefined;

    const fileUpload = <DashboardFileUpload />;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={submit}>
          <FormFields>
            <fieldset>
               <FormField label="Content" htmlFor="content">
                <textarea id="content" name="content" type="text"
                  value={content} onChange={this._onChange} rows="10" />
              </FormField>
              <FormField label="Card Label" htmlFor="label">
                <input id="label" name="label" type="text"
                  value={label} onChange={this._onChange} />
              </FormField>
              <FormField label="Card Heading" htmlFor="heading">
                <input id="heading" name="heading" type="text"
                  value={heading} onChange={this._onChange} />
              </FormField>
              <FormField label="Card Link Text" htmlFor="linkText">
                <input id="linkText" name="linkText" type="text"
                  value={linkText} onChange={this._onChange} />
              </FormField>
              <FormField label="Card Link URL" htmlFor="linkUrl">
                <input id="linkUrl" name="linkUrl" type="text"
                  value={linkUrl} onChange={this._onChange} />
              </FormField>
              <FormField label="Card thumbnail path" htmlFor="image">
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

CardParagraphForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}


export default connect(mapStateToProps)(CardParagraphForm);
