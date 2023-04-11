/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector, getUserSelector, updateUser,
} from '../../../redux/slices/userSlice';
import { Modal } from '../../organisms/Modal/Modal';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './editUserNameModal.module.css';
import { editUserNameValidationSchema } from '../../../utils/validators';
import { getQueryKeyUser } from '../../../utils/constants';

export function EditUserNameModal({
  closeHandler, isOpen,
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessTokenSelector);
  const { id, name } = useSelector(getUserSelector);
  const queryClient = useQueryClient();
  const initialValues = {
    name,
  };
  const { mutateAsync } = useMutation({
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
      toast.error('Не удалось изменить имя пользователя', {
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
  const editUserNameHandler = async (values) => {
    await mutateAsync(values);
    queryClient.invalidateQueries({
      queryKey: getQueryKeyUser(id),
    });
    dispatch(updateUser(values));
    toast.success('Имя пользователя изменено', {
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
        validationSchema={editUserNameValidationSchema}
        onSubmit={(values) => editUserNameHandler(values)}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.Form}>
            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Имя
              </p>
              <Field
                name="name"
                type="text"
                placeholder="Введите ваше имя"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                name="name"
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
