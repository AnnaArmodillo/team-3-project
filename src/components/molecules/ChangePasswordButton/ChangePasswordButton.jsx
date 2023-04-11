import { useState } from 'react';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ChangePasswordModal } from './ChangePasswordModal';

export function ChangePasswordButton() {
  const [isShowChangePasswordModal, setIsShowChangePasswordModal] = useState(false);

  const closeChangePasswordModalHandler = () => {
    setIsShowChangePasswordModal(false);
  };

  const openChangePasswordModalHandler = () => {
    setIsShowChangePasswordModal(true);
  };

  return (
    <>
      <ButtonGrey
        type="button"
        onClick={openChangePasswordModalHandler}
      >
        Изменить пароль
      </ButtonGrey>
      <ChangePasswordModal
        closeHandler={closeChangePasswordModalHandler}
        isOpen={isShowChangePasswordModal}
      />

    </>
  );
}
