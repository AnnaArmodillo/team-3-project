import { useState } from 'react';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { DeleteProfileModal } from './DeleteProfileModal';

export function DeleteProfileButton() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeDeleteModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openDeleteModalHandler = () => {
    setIsShowDeleteModal(true);
  };

  return (
    <>
      <ButtonGrey
        type="button"
        onClick={openDeleteModalHandler}
      >
        Удалить аккаунт
      </ButtonGrey>
      <DeleteProfileModal
        closeHandler={closeDeleteModalHandler}
        isOpen={isShowDeleteModal}
      />

    </>
  );
}
