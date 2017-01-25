/* @flow */
import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function LayoutForm(props: {
  title: string,
  fields: Array<{
    label: string,
    name: string,
    type: 'Select',
    options: Array<any>,
    value: ?string
  }>,
  onChange: Function
}) {
  const { onChange, title, fields } = props;
  return (
    <fieldset>
      <legend>{title}</legend>
      {fields.map((field, i) =>
        <FormField key={i} label={field.label} htmlFor={field.name}>
          <Select
            id={field.name}
            name={field.name}
            onChange={({ target, option }) =>
              onChange({ value: option, name: target.name })
            }
            value={{ value: field.value, label: field.value || '' }}
            options={field.options}
          />
        </FormField>
      )}
    </fieldset>  
  );
}

