/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import colorOptionsList from './internal/colorIndexes';

type ErrorType = string;

type BlockColorSwatchFormState = {
  colorIndexInput: ?string,
  contentInput: ?string,
  colorOptions: Array<string>,
  errors: ?{
    colorIndexInput: ?ErrorType,
    contentInput: ?ErrorType
  }
};

type BlockColorSwatchFormProps = {
  onSubmit?: Function,
  colorIndex: ?string,
  content: ?string
};

export default class BlockColorSwatchForm extends React.Component {
  state: BlockColorSwatchFormState;
  props: BlockColorSwatchFormProps;
  constructor(props: BlockColorSwatchFormProps) {
    super(props);
    (this:any)._onChange = this._onChange.bind(this);
    (this:any)._onSubmit = this._onSubmit.bind(this);
    (this:any)._onSearch = this._onSearch.bind(this);
    (this:any)._formIsValid = this._formIsValid.bind(this);
    let colorIndexInput = '';
    let contentInput = '';
    const { colorIndex, content } = props;
    if (colorIndex) {
      colorIndexInput = colorIndex;
    }
    if (content) {
      contentInput = content;
    }
    this.state = {
      errors: null,
      colorIndexInput,
      contentInput,
      colorOptions: colorOptionsList
    };
  }
  
  _onChange({ target, option }: any) {
    if (option) {
      this.setState({
        [`${target.id}`]: option,
        errors: this.state.colorIndexInput
          ? null
          : this.state.errors
      });
    } else {
      this.setState({
        [`${target.id}`]: target.value,
        errors: this.state.contentInput
          ? null
          : this.state.errors
      });
    }
  }

  _onSubmit(event: any) {
    event.preventDefault();
    const { colorIndexInput, contentInput } = this.state;
    if (this._formIsValid() && this.props.onSubmit) {
      this.props.onSubmit({
        colorIndex: colorIndexInput,
        content: contentInput
      });
    } else {
      const errors = {
        colorIndexInput: colorIndexInput && colorIndexInput.length > 0
          ? '' : 'Please enter a valid color index',
        contentInput: contentInput && contentInput.length > 0
          ? '' : 'Please enter some content for the box'
      };
      this.setState({
        errors
      });
    }
  }

  _onSearch(e: any) {
    const { colorOptions } = this.state;
    const { value } = e.target;
    const newOptions = value === '' || !value
      ? colorOptionsList 
      : colorOptions.filter(i => i.includes(value));
    this.setState({
      colorOptions: newOptions
    });
  }

  _formIsValid() {
    const { colorIndexInput, contentInput } = this.state;
    if (colorIndexInput && contentInput) {
      return colorIndexInput.length > 0 && contentInput.length > 0;
    }
    return false;
  }

  render() {
    const {
      colorIndexInput,
      contentInput,
      errors,
      colorOptions
    } = this.state;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Content"
                htmlFor="contentInput"
                error={errors && errors.contentInput ? errors.contentInput : ''}
              >
                <textarea
                  id="contentInput"
                  name="contentInput"
                  type="text"
                  value={contentInput}
                  onChange={this._onChange}
                  rows="10"
                />
              </FormField>
              <FormField
                label="Color Index"
                htmlFor="colorIndexInput"
                help="The color index for the box.  See: https://grommet.github.io/docs/color"
                error={errors && errors.colorIndexInput ? errors.colorIndexInput : ''}
              >
                <Select
                  onSearch={this._onSearch}
                  onChange={this._onChange}
                  value={colorIndexInput || ''}
                  options={colorOptions}
                  name="colorIndexInput"
                  id="colorIndexInput"
                />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad="medium">
            <Button
              onClick={this._onSubmit}
              type="submit"
              label="Done"
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

