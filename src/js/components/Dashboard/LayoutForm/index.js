/* @flow */
import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function LayoutForm(props: {
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
  onChange: Function
}) {
  const { padding, basis, wrap, onChange } = props;
  return (
    <fieldset>
      <legend>
        Layout Options
      </legend>
      <FormField label="Padding" htmlFor="padding">
        <Select
          id="padding"
          name="padding"
          onChange={({ target, option }) =>
            onChange({ value: option, name: target.name })
          }
          value={{ value: padding.value, label: padding.value || '' }}
          options={padding.options}
        />
      </FormField>
      <FormField label="Basis" htmlFor="basis">
        <Select
          id="basis"
          name="basis"
          onChange={({ target, option }) =>
            onChange({ value: option, name: target.name })
          }
          value={{ value: basis.value, label: basis.value || '' }}
          options={basis.options}
        />
      </FormField>
      <FormField label="Wrap" htmlFor="wrap">
        <CheckBox
          id="wrap"
          name="wrap"
          label={`Wrap content`}
          checked={wrap.value}
          onChange={({ target }) => onChange(target)}
        />
      </FormField>
    </fieldset>
  );
}

