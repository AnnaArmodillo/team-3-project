import { useState } from 'react';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ChangePhotoModal } from './ChangePhotoModal';

export function ChangePhotoButton() {
  const [isShowChangePhotoModal, setIsShowChangePhotoModal] = useState(false);

  const closeChangePhotoModalHandler = () => {
    setIsShowChangePhotoModal(false);
  };

  const openChangePhotoModalHandler = () => {
    setIsShowChangePhotoModal(true);
  };

  return (
    <>
      <ButtonGrey
        type="button"
        onClick={openChangePhotoModalHandler}
        title="Изменить фото профиля"
      >
        <i className="fa-solid fa-pencil" />
      </ButtonGrey>
      <ChangePhotoModal
        closeHandler={closeChangePhotoModalHandler}
        isOpen={isShowChangePhotoModal}
      />

    </>
  );
}
