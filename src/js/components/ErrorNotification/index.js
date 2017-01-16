/* @flow */
import React from 'react';
import Notification from 'grommet/components/Notification';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';

export default function ErrorNotification(props: {
  errors: Array<{ message: string }> },
  onClose: (i: number) => void
) {
  return (
    <Section className="error-notification" pad="medium">
      {props.errors.length > 0 && props.errors.map((error, i) =>
        <Box key={i} pad={{ horizontal: "large" }}>
          <Button
            plain
            onClick={() => props.onClose(i)}
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
