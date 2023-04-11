/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
  getUserSelector,
  updateUser,
} from '../../../redux/slices/userSlice';
import { Modal } from '../../organisms/Modal/Modal';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './changePhotoModal.module.css';
import { ButtonLightPurple } from '../../atoms/ButtonLightPurple/ButtonLightPurple';
import { Loader } from '../../Loader/Loader';
import placeholderImage from '../../../images/placeholder_image.png';
import { getQueryKeyUser } from '../../../utils/constants';

export function ChangePhotoModal({ closeHandler, isOpen }) {
  const accessToken = useSelector(getAccessTokenSelector);
  const { id } = useSelector(getUserSelector);
  const queryClient = useQueryClient();
  const [imageContent, setImageContent] = useState('');
  const [imageLinkValue, setImageLinkValue] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();
  const filePicker = useRef();
  const formData = new FormData();
  function changeImageLinkHandler(event) {
    setImageContent(event.target.value);
    setImageLinkValue(event.target.value);
  }
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handlePick = (event) => {
    if (!event.target.closest('button') && !event.target.closest('i')) {
      filePicker.current.click();
    }
  };
  function deleteImageHandler() {
    setImageContent('');
    setImageLinkValue('');
  }
  const {
    mutateAsync: mutateAsyncUpload,
    isError: isErrorUpload,
    error: errorUpload,
    isLoading: isLoadingUpload,
  } = useMutation({
    mutationFn: (data) => teamProjectApi.uploadFile(data, accessToken),
  });
  async function uploadHandler() {
    formData.append('image', selectedFile);
    formData.getAll('files');
    const res = await mutateAsyncUpload(formData);
    if (
      res
      !== 'Не выбран файл для загрузки, либо его тип не соответствует типу изображения'
    ) {
      const blob = new Blob([selectedFile], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      setImageContent(url);
      setImageLinkValue(res);
    }
    setSelectedFile('');
  }
  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (values) => teamProjectApi.editUserById(id, accessToken, values),
  });
  const changePhotoHandler = async () => {
    await mutateAsync({ photo: imageLinkValue });
    closeHandler();
    dispatch(updateUser({ photo: imageLinkValue }));
    setImageContent('');
    setImageLinkValue('');
    queryClient.invalidateQueries({ queryKey: getQueryKeyUser(id) });
  };
  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
    >
      <p>Фото</p>
      <input
        type="text"
        placeholder="ссылка на изображение"
        onChange={(event) => changeImageLinkHandler(event)}
        value={imageLinkValue || ''}
        className={styles.field}
      />
      <input
        className={styles.hidden}
        encType="multipart/form-data"
        type="file"
        ref={filePicker}
        onChange={handleChange}
      />
      {selectedFile !== '' && (
        <ButtonLightPurple
          type="button"
          onClick={uploadHandler}
        >
          Загрузить файл
        </ButtonLightPurple>
      )}
      <div
        className={styles.image}
        onClick={handlePick}
        title="загрузить файл"
      >
        {isErrorUpload && !isLoadingUpload && (
          <div className={styles.messageImage}>{errorUpload.message}</div>
        )}
        {isLoadingUpload && <Loader />}
        {imageContent && (
          <button
            type="button"
            title="удалить файл"
            className={styles.buttonImageDelete}
            onClick={deleteImageHandler}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
        {!isLoadingUpload && !isErrorUpload && (
          <img
            src={imageContent || placeholderImage}
            alt="добавьте изображение"
          />
        )}
      </div>
      <div className={styles.btnWr}>
        <ButtonPurple
          type="submit"
          disabled={!imageLinkValue}
          onClick={changePhotoHandler}
        >
          Сохранить
        </ButtonPurple>
        <ButtonGrey
          type="reset"
          onClick={closeHandler}
        >
          Отменить изменения
        </ButtonGrey>
      </div>
      {isError && <div>{error.message}</div>}
    </Modal>
  );
}
