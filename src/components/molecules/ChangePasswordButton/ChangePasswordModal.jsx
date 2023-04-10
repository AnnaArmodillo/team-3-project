/* eslint-disable import/no-extraneous-dependencies */
import { useMutation } from '@tanstack/react-query';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector, getUserSelector, setUser,
} from '../../../redux/slices/userSlice';
import { Modal } from '../../organisms/Modal/Modal';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './changePasswordModal.module.css';
import { changePasswordValidationSchema } from '../../../utils/validators';
import { RequiredFieldTooltip } from '../RequiredFieldTooltip/RequiredFieldTooltip';

export function ChangePasswordModal({
  closeHandler, isOpen,
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessTokenSelector);
  const { id } = useSelector(getUserSelector);
  const initialValues = {
    newPassword: '',
    password: '',
  };
  const {
    mutateAsync, isError, error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.editUserById(id, accessToken, values),
  });
  const changePasswordHandler = async (values) => {
    const data = await mutateAsync(values);
    closeHandler();
    dispatch(setUser(data));
    toast.success('Пароль изменен', {
      autoClose: 2000,
      transition: Slide,
      className: `${styles.toast}`,
      bodyClassName: `${styles.toastBody}`,
      hideProgressBar: true,
      theme: 'colored',
      closeButton: false,
      rtl: false,
    });
  };
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={(values) => changePasswordHandler(values)}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.Form}>
            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Новый пароль
                <RequiredFieldTooltip />
              </p>
              <Field
                name="newPassword"
                placeholder="Новый пароль"
                type="password"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                name="password"
                className={styles.Error}
              />
            </div>

            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Пароль
                <RequiredFieldTooltip />
              </p>
              <Field
                name="password"
                placeholder="Пароль"
                type="password"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                name="password"
                className={styles.Error}
              />
            </div>

            <div className={styles.btnWr}>
              <ButtonPurple
                type="submit"
                disabled={!isValid || !dirty}
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
