/* @flow */
import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function LayoutForm(props: {
  sections: Array<{
    title: string,
    fields: Array<{
      label: string,
      name: string,
      type: 'Select',
      options: Array<any>,
      value: ?string
    }>
  }>,
  onChange: Function
}) {
  const { onChange, sections } = props;
  return (
    <div>
      {sections.map((item, sectionIndex) =>
        <fieldset key={sectionIndex}>
          <legend>{item.title}</legend>
          {item.fields.map((field, i) =>
            <FormField key={i} label={field.label} htmlFor={field.name}>
              <Select
                id={field.name}
                name={field.name}
                onChange={({ target, option }) =>
                  onChange({ value: option, name: target.name, sectionIndex })
                }
                value={{ value: field.value, label: field.value || '' }}
                options={field.options}
              />
            </FormField>
          )}
        </fieldset>  
      )}
    </div>
  );
}

