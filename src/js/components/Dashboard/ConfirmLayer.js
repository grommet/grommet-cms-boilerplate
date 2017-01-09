import React from 'react';

import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';

export default function ConfirmLayer(props) {
  return (
    <Layer onClose={props.onClose} closer={true}>
      <Form>
        <Header>Are you sure you want to delete {props.name || 'this'}?</Header>
        <FormFields>
          <button onClick={props.onSubmit} style={{marginBottom:'24px'}}>delete</button>
        </FormFields>
      </Form>
    </Layer>
  );
}
