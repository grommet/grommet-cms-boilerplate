// @flow
import React from 'react';
import Toast from 'grommet/components/Toast';
import { ErrorNotification } from 'grommet-cms/components';

export default function DashboardPostPageNotifier(props: {
  toastMessage: ?string,
  error: ?string,
  onCloseToast: Function,
  onClearError: Function
}) {
  const { toastMessage, error, onCloseToast, onClearError } = props;
  if (error) {
    return (
      <ErrorNotification
        errors={[{ message: error }]}
        onClose={onClearError}
      />
    );
  }
  if (toastMessage) {
    return (
      <Toast
        onClose={onCloseToast}
        status="warning"
      >
        {toastMessage}
      </Toast>
    );
  }
  return null;
}
