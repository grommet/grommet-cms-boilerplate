import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

export class QuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || '',
      source: props.source || ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange({ target }) {
    const key = target.id;
    let val = target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { content, source } = this.state;

    return (
      <Box colorIndex="light-2" pad="medium">
        <Form compact={false} onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Content" htmlFor="content">
                <textarea id="content" name="content" type="text"
                  value={content} onChange={this._onChange} rows="10" />
              </FormField>
              <FormField label="Source" htmlFor="source">
                <input id="source" name="source" type="text"
                  value={source} onChange={this._onChange} />
              </FormField>
            </fieldset>
            <Button onClick={this._onSubmit} primary={false} type="submit" 
              label="Done" />
          </FormFields>
        </Form> 
      </Box>
    );
  }
};

QuoteForm.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func
};

export default QuoteForm;
