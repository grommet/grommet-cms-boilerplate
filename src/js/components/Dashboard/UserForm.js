import React, { PropTypes } from 'react';

import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import HPELogo from 'grommet-cms/components/HPELogo';

export default function UserForm(props) {
  return (
    <Form compact={false} onSubmit={props.onSubmit}>
      <Box align="center" pad="medium">
        <HPELogo />
        <Header pad={{ vertical: "medium" }}>
          <Heading align="center">{props.title}</Heading>
        </Header>
      </Box>
      <FormFields className="dashboard__user-form">
        <fieldset>
          <FormField label="Username" htmlFor={"username"}>
            <input id={"username"} name="username" type="text"
              value={props.username} onChange={props.onChange} />
          </FormField>
          <FormField label="Password" htmlFor={"password"}>
            <input id={"password"} name="password" type="password"
              value={props.password} onChange={props.onChange} />
          </FormField>
        </fieldset>
        <Button onClick={props.onSubmit} primary={true} type="submit"
          label={props.submitMessage} />
      </FormFields>
    </Form>
  );
}

UserForm.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitMessage: PropTypes.string
};

UserForm.defaultProps = {
  submitMessage: 'submit'
};
