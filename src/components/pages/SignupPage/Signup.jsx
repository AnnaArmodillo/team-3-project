import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { signUpFormValidationSchema } from '../../../utils/validators';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './signup.module.css';
import { Loader } from '../../Loader/Loader';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { RequiredFieldTooltip } from '../../molecules/RequiredFieldTooltip/RequiredFieldTooltip';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';

const initialValues = {
  email: '',
  name: '',
  login: '',
  password: '',
};

export function Signup() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.addNewUser(values).then((res) => {
      if (res === 'Пользователь с таким логином уже существует') {
        throw new Error('Пользователь с таким логином уже существует');
      }
      if (res === 'Пользователь с таким email уже существует') {
        throw new Error('Пользователь с таким email уже существует');
      }
    }),
  });

  if (isError) {
    return (
      <MainWrap>
        <div className={styles.signupPage}>
          <h1>
            Произошла ошибка при создании пользователя
          </h1>
          <p>
            {error.message}
          </p>
          <Link
            to="/signin"
            className={styles.linkError}
            state={{ from: pathname }}
          >
            Перейти на страницу входа
          </Link>
        </div>
      </MainWrap>
    );
  }

  if (isLoading) {
    return (
      <MainWrap>
        <Loader />
      </MainWrap>
    );
  }

  const submitHandler = async (values) => {
    await mutateAsync(values);
    navigate('/signin');
  };

  return (
    <MainWrap>
      <div className={styles.signupPageContainer}>
        <h1>Создание учетной записи</h1>
        <p className={styles.alreadyRegistered}>
          Уже зарегистрированы?
          {' '}
          <Link
            to="/signin"
            className={styles.linkError}
            state={{ from: pathname }}
          >
            Перейти на страницу входа
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className={styles.Form}>
            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Электронная почта
                <RequiredFieldTooltip />
              </p>
              <Field
                id="email"
                name="email"
                placeholder="Электронная почта"
                type="email"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                name="email"
                className={styles.Error}
              />
            </div>

            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Имя
                <RequiredFieldTooltip />
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

            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Логин
                <RequiredFieldTooltip />
              </p>
              <Field
                name="login"
                type="text"
                placeholder="Введите ваш логин"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                name="login"
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
                disabled={isLoading}
              >
                Зарегистрироваться
              </ButtonPurple>
              <ButtonGrey
                type="reset"
                disabled={isLoading}
              >
                Сбросить
              </ButtonGrey>
            </div>
          </Form>
        </Formik>
      </div>
    </MainWrap>
  );
}
