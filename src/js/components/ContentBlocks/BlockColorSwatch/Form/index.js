/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import ColorTypeList from '../Shared/ColorTypeList';

type InputFormState = {
  nameInput: string,
  colorInput: string
};

export default class InputForm extends React.Component {
  state: InputFormState;
  constructor() {
    super();
    // $FlowFixMe contravariant
    this._onChange = this._onChange.bind(this);
    this.state = {
      nameInput: '',
      colorInput: '#ff0000'
    };
  }
  
  _onChange({ target }: any) {
    this.setState({
      [`${target.id}`]: target.value
    });
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
        </Form>
      </Box>
    );
  }
}

