import { useMemo, useState } from 'react';

import { Button, Modal, Toast } from '../../components';
import { SubmitResult } from './SubmitResult';
import { UserEmailForm } from './UserEmailForm';

export const UserInputModal = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const [submitResultModal, setSubmitResultModal] = useState(false);

  const handleClickRequestInvite = () => {
    setInviteModalVisible(true);
  };
  const handleClose = () => {
    setInviteModalVisible(false);
  };
  const handleError = (visible: boolean, message: string) => {
    setToastMessage(message);
    setToastVisible(visible);
  };

  const toast = useMemo(
    () => (
      <Toast
        message={toastMessage}
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    ),
    [toastMessage, toastVisible],
  );
  return (
    <>
      {toast}
      <Button onClick={handleClickRequestInvite}>Request an invite</Button>
      <Modal
        title="Request an invite"
        visible={inviteModalVisible}
        onClose={handleClose}
        content={
          <UserEmailForm
            handleSuccess={handleClose}
            handleError={handleError}
          />
        }
      />
      <Modal
        title="All done!"
        visible={submitResultModal}
        onClose={() => setSubmitResultModal(false)}
        content={<SubmitResult />}
      />
    </>
  );
};
