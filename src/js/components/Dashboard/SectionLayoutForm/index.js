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
import { LayoutForm, ViewMoreViewLess } from 'grommet-cms/components';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function SectionLayoutForm(props: {
  onClose: Function,
  onChange: Function,
  onSubmit: Function,
  isEditing: boolean,
  isVisible: boolean,
  name: {
    value: string
  },
  title: string,
  fields: Array<{
    label: string,
    name: string,
    type: "Select",
    options: Array<string>,
    value: ?string
  }>,
  showAdvancedLayout: boolean,
  onShowMore: Function
}) {
  const {
    onClose,
    onChange,
    onSubmit,
    isEditing,
    isVisible,
    name,
    showAdvancedLayout,
    onShowMore,
    ...sectionLayoutForm
  } = props;
  return (
    <Layer
      closer
      align="left"
      onClose={onClose}
      hidden={!isVisible}
    >
      <Header pad="medium" align="center">
        <Heading strong align="center">
          {`${isEditing ? 'Edit' : 'Add'} Section`}
        </Heading>
      </Header>
      <Section pad="medium" align="center">
        <Form pad="medium" className="dashboad--section-layout-form__scroll">
          <FormFields>
            <fieldset>
              <FormField label="Name" htmlFor="name">
                <input
                  autoFocus
                  id="name"
                  name="name"
                  type="text"
                  value={name.value}
                  onChange={({ target }) => onChange(target)}
                />
              </FormField>
            </fieldset>
            <ViewMoreViewLess
              onShowMore={onShowMore}
              isShowingMore={showAdvancedLayout}
            >
              <LayoutForm
                {...sectionLayoutForm}
                onChange={onChange}
              />
            </ViewMoreViewLess>
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
