import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { signInFormValidationSchema } from '../../../utils/validators';
import styles from './signin.module.css';
import { setUser } from '../../../redux/slices/userSlice';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { Loader } from '../../Loader/Loader';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { RequiredFieldTooltip } from '../../molecules/RequiredFieldTooltip/RequiredFieldTooltip';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';

export function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.signIn(values).then(),
  });

  if (isError) {
    return (
      <MainWrap>
        <div className={styles.signupPage}>
          <h1>
            Произошла ошибка при входе в приложение
          </h1>
          <p>
            {error.message}
          </p>
          <Link to="/signup" className={styles.linkError}>Зарегистрироваться</Link>
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
    const data = await mutateAsync(values);
    dispatch(setUser(data));

    if (locationState?.from) {
      return navigate(locationState.from);
    }
    return navigate('/');
  };

  return (
    <MainWrap>
      <div className={styles.signinPageContainer}>
        <h1>Войти в приложение</h1>
        <p className={styles.notRegistered}>
          Еще нет профиля?
          {' '}
          <Link to="/signup" className={styles.link}>Зарегистрироваться</Link>
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className={styles.Form}>
            <div className={styles.Form_Group}>
              <p className={styles.Form_Label}>
                Электронная почта
                <RequiredFieldTooltip />
              </p>
              <Field
                name="email"
                placeholder="Электронная почта"
                type="email"
                className={styles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className={styles.Error}
                name="email"
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
                className={styles.Error}
                name="password"
              />
            </div>

            <div className={styles.btnWr}>
              <ButtonPurple
                type="submit"
                disabled={isLoading}
              >
                Войти
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
