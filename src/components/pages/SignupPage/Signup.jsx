import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { signUpFormValidationSchema } from '../../../utils/validators';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './signup.module.css';
import { Loader } from '../../Loader/Loader';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';

const initialValues = {
  email: '',
  name: '',
  password: '',
};

export function Signup() {
  const navigate = useNavigate();
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.addNewUser(values).then(),
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
          <Link to="/signin" className={styles.linkError}>Перейти на страницу входа</Link>
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
        <p className={styles.alreadyRegitered}>
          Уже зарегистрированы?
          {' '}
          <Link to="/signin" className={styles.link}>Перейти на страницу входа</Link>
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
                <span><sup>&#9913;</sup></span>
                <span className={styles.mustHave__description}>
                  Этот элемент является обязательным
                </span>
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
                <span><sup>&#9913;</sup></span>
                <span className={styles.mustHave__description}>
                  Этот элемент является обязательным
                </span>
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
                Пароль
                <span><sup>&#9913;</sup></span>
                <span className={styles.mustHave__description}>
                  Этот элемент является обязательным
                </span>
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
              <ButtonWhite
                type="reset"
                disabled={isLoading}
              >
                Сбросить
              </ButtonWhite>
            </div>
          </Form>
        </Formik>
      </div>
    </MainWrap>
  );
}
