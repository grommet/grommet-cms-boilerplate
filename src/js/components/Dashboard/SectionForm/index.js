/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
// $FlowFixMe
import { LayoutForm } from 'grommet-cms/components';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function PostSectionForm(props: {
  isVisible: boolean,
  onClose: Function,
  onChange: Function,
  name?: string,
  padding: {
    value: ?string,
    options: OptionType[]
  },
  basis: {
    value: ?string,
    options: OptionType[]
  },
  wrap: {
    value: boolean
  },
  onSubmit: Function,
  isEditing: boolean,
}) {
  const {
    isVisible,
    onClose,
    onChange,
    name,
    onSubmit,
    isEditing,
    padding,
    basis,
    wrap
  } = props;
  return (
    <Layer
      closer
      align="right"
      onClose={onClose}
      hidden={!isVisible}
    >
      <Header pad="medium" align="center">
        <Heading strong align="center">
          {`${isEditing ? 'Edit' : 'Add'} Section`}
        </Heading>
      </Header>
      <Section pad="medium" align="center">
        <Form pad="medium">
          <FormFields>
            <FormField label="Name" htmlFor="name">
              <input
                autoFocus
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={({ target }) => onChange(target)}
              />
            </FormField>
            <LayoutForm
              onChange={onChange}
              padding={padding}
              basis={basis}
              wrap={wrap}
            />
          </FormFields>
        </Form>
      </Section>
      <Section pad="medium" align="center">
        <Footer align="center" justify="center" pad="medium">
          <Menu
            align="center"
            style={{ width: '100%' }}
            justify="between"
            direction="row"
            inline
            responsive={false}
          >
            <Button
              label="submit"
              onClick={onSubmit}
              primary={true}
              type="submit"
            />
            <Button
              label="cancel"
              onClick={onClose}
              primary={false}
            />
          </Menu>
        </Footer>
      </Section>
    </Layer>
  );
}
