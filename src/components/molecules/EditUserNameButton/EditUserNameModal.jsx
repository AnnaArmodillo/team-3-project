/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
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
  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (values) => teamProjectApi.editUserById(id, accessToken, values),
  });
  const editUserNameHandler = async (values) => {
    await mutateAsync(values);
    closeHandler();
    queryClient.invalidateQueries({
      queryKey: getQueryKeyUser(id),
    });
    dispatch(updateUser(values));
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
            {isError && <div>{error.message}</div>}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
