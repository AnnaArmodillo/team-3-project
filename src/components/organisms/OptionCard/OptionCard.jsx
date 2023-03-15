import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Field } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
  getUserSelector,
} from '../../../redux/slices/userSlice';
import { Loader } from '../../Loader/Loader';
import styles from './optionCard.module.css';

export function OptionCard({ option, isAvailable }) {
  const { id } = useSelector(getUserSelector);
  const accessToken = useSelector(getAccessTokenSelector);
  const [url, setUrl] = useState('');
  function checkIsImageUploaded() {
    if (
      option.image.startsWith('data')
      || option.image.startsWith('http')
      || !option.image
    ) {
      return false;
    }
    return true;
  }
  function isChecked() {
    if (option.checked === id) {
      return true;
    }
    return false;
  }
  function isDisabled() {
    if (option.checked !== '' || !isAvailable) {
      return true;
    }
    return false;
  }
  const { isError, error, isLoading } = useQuery({
    queryKey: ['image', option.image],
    queryFn: () => teamProjectApi
      .getUploadedFile(option.image, accessToken)
      .then((res) => res.blob())
      .then((result) => {
        setUrl(window.URL.createObjectURL(result));
        return result;
      }),
    enabled: checkIsImageUploaded(),
  });
  return (
    <>
      <Field
        type="radio"
        name="checked"
        id={option.optionId}
        value={option.optionId}
        disabled={isDisabled()}
      />
      <label
        htmlFor={option.optionId}
        className={classNames({ [styles.checked]: isChecked() }, [styles.card])}
      >
        <div className={styles.info}>
          <div>{option.optionTitle}</div>
          <Link
            to={option.activeLink}
            className={styles.link}
          >
            {option.activeLink}
          </Link>
        </div>
        <div className={styles.image}>
          {isLoading && checkIsImageUploaded() && <Loader />}
          {isError && <div className={styles.message}>{error.message}</div>}
          {((!checkIsImageUploaded() && option.image)
            || (checkIsImageUploaded && (!isLoading && !isError))) && (
            <img
              src={url || option.image}
              alt="изображение"
            />
          )}
        </div>
      </label>
    </>
  );
}
