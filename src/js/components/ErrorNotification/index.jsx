/* @flow */
import React from 'react';
import Notification from 'grommet/components/Notification';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';

export default function ErrorNotification(props: {
  errors: Array<{ message: string}> },
  onClose: Function
) {
  return (
    <Section className="error-notification">
      {props.errors.length > 0 && props.errors.map((error, i) =>
        <Box key={i}>
          <Button
            plain
            onClick={onClose}
            className="error-notification__closer-button"
            a11yTitle="Close Alert"
          >
            <CloseIcon a11yTitle="Close Alert" />
          </Button>
          <Notification
            role="alert"
            style={{ paddingTop: 10 }}
            status="critical"
            a11yTitle="Submission Failed"
            size="small"
            message={error.message}
            state="Active"
          />
        </Box>
      )}
    </Section>
  );
}
