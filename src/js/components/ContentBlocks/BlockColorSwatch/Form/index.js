/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import ColorTypeList from '../Shared/ColorTypeList';

type BlockColorSwatchFormState = {
  nameInput: string,
  colorInput: string,
  error: ?string
};

type BlockColorSwatchFormProps = {
  onSubmit: Function,
  color?: {
    name: ?string,
    hex: ?string
  }
};

export default class BlockColorSwatchForm extends React.Component {
  state: BlockColorSwatchFormState;
  props: BlockColorSwatchFormProps;
  constructor(props: BlockColorSwatchFormProps) {
    super(props);
    (this:any)._onChange = this._onChange.bind(this);
    (this:any)._onSubmit = this._onSubmit.bind(this);
    (this:any)._formIsValid = this._formIsValid.bind(this);
    let nameInput = '';
    let colorInput = '#000000';
    const { color } = props;
    if (color) {
      if (color.name) {
        nameInput = color.name;
      }
      if (color.hex) {
        colorInput = color.hex;
      }
    }
    this.state = {
      nameInput,
      error: null,
      colorInput
    };
  }
  
  _onChange({ target }: any) {
    this.setState({
      [`${target.id}`]: target.value,
      error: this.state.nameInput
        ? null
        : this.state.error
    });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    const { colorInput, nameInput } = this.state;
    if (this._formIsValid()) {
      this.props.onSubmit({
        color: {
          hex: colorInput,
          name: nameInput
        }
      });
    } else {
      this.setState({
        error: 'Please enter a valid name'
      });
    }
  }

  _formIsValid() {
    const hexRE = /(0x)?[0-9a-f]+/i;
    const { colorInput, nameInput } = this.state;
    return hexRE.test(colorInput) && nameInput.length > 0;
  }

  render() {
    const {
      nameInput,
      colorInput
    } = this.state;
    return (
      <Box colorIndex="light-2" pad="medium">
        <Form>
          <FormFields>
            <fieldset>
              <FormField
                label="Color Name"
                htmlFor="nameInput"
                error={this.state.error}
              >
                <TextInput
                  onDOMChange={this._onChange}
                  value={nameInput}
                  name="nameInput"
                  id="nameInput"
                />
              </FormField>
              <FormField
                label="Color"
                help="Tap the color picker to select the color value"
                htmlFor="colorInput"
              >
                <Box pad="medium" align="center">
                  <input
                    onChange={this._onChange}
                    style={{ width: 150, height: 40, padding: 0 }}
                    value={colorInput}
                    id="colorInput"
                    name="colorInput"
                    type="color"
                  />
                  <ColorTypeList
                    color={{
                      hex: colorInput,
                      name: nameInput
                    }}
                  />
                </Box>
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

