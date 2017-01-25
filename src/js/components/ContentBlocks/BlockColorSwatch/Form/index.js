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
  colorInput: string
};

type BlockColorSwatchFormProps = {
  onSubmit: Function
};

export default class BlockColorSwatchForm extends React.Component {
  state: BlockColorSwatchFormState;
  props: BlockColorSwatchFormProps;
  constructor() {
    super();
    (this:any)._onChange = this._onChange.bind(this);
    (this:any)._onSubmit = this._onSubmit.bind(this);
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

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onSubmit(this.state);
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

