/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';

export default function PostSectionForm(props: {
  isVisible: boolean,
  onClose: Function,
  onChange: Function,
  name?: string,
  id?: string,
  onSubmit: Function
}) {
  const { isVisible, onClose, onChange, name, id, onSubmit } = props;
  return (
    <Layer
      align="right"
      onClose={onClose}
      hidden={!isVisible}
    >
      <Section pad="medium" align="center">
        <Form pad="medium">
          <FormFields>
            <FormField label="Section Name" htmlFor="name">
              <input
                autoFocus
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => onChange(e.target.value, id)}
              />
            </FormField>
            <FormField label="Section ID" htmlFor="id">
              <input
                id="id"
                name="id"
                type="text"
                value={id}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </FormField>
          </FormFields>
        </Form>
        <Section pad="medium">
          <Box pad="small">
            <Footer align="center" justify="center" pad="large">
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
          </Box>
        </Section>
      </Section>
    </Layer>
  );
}
