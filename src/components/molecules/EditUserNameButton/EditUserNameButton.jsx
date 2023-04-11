import { useState } from 'react';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { EditUserNameModal } from './EditUserNameModal';

export function EditUserNameButton() {
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const closeEditModalHandler = () => {
    setIsShowEditModal(false);
  };

  const openEditModalHandler = () => {
    setIsShowEditModal(true);
  };

  return (
    <>
      <ButtonGrey
        type="button"
        onClick={openEditModalHandler}
        title="Изменить имя"
      >
        <i className="fa-solid fa-pencil" />
      </ButtonGrey>
      <EditUserNameModal
        closeHandler={closeEditModalHandler}
        isOpen={isShowEditModal}
      />

    </>
  );
}
