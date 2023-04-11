/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { getQueryKeyUser } from '../../../utils/constants';

export function ChangePasswordModal({
  closeHandler, isOpen,
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const accessToken = useSelector(getAccessTokenSelector);
  const { id } = useSelector(getUserSelector);
  const initialValues = {
    newPassword: '',
    password: '',
  };
  const {
    mutateAsync,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.editUserById(id, accessToken, values),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: getQueryKeyUser(id) });
      const previousValues = queryClient.getQueryData(getQueryKeyUser(id));
      queryClient.setQueryData(getQueryKeyUser(id), values);
      closeHandler();
      return { previousValues, values };
    },
    onError: (context) => {
      queryClient.setQueryData(getQueryKeyUser(id), context.previousValues);
      toast.error('Не удалось изменить пароль', {
        autoClose: 2000,
        transition: Slide,
        className: `${styles.toast}`,
        bodyClassName: `${styles.toastBody}`,
        hideProgressBar: true,
        theme: 'colored',
        closeButton: false,
        rtl: false,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(getQueryKeyUser(id));
    },
  });
  const changePasswordHandler = async (values) => {
    const data = await mutateAsync(values);
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
