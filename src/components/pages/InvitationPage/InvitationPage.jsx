/* eslint-disable react/no-array-index-key */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ErrorMessage,
  Field, FieldArray, Form, Formik,
} from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { useDebounce } from '../../../hooks/useDebounce';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import { InviteUsersValidationScheme } from '../../../utils/validators';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { Loader } from '../../Loader/Loader';
import styles from './invitationPage.module.css';
import { getSurveySelector } from '../../../redux/slices/surveySlice';

export function InvitationPage() {
  const surveyId = useSelector(getSurveySelector);
  const token = useSelector(getAccessTokenSelector);
  const [searchValue, setSearchValue] = useState([]);
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState('');
  const usersGroup = {
    email: '',
  };
  function changeSearchHandler(event, index) {
    const searchArray = [...searchValue];
    searchArray[index] = event.target.value;
    setSearchValue([...searchArray]);
    setCurrentIndex(index);
  }
  function clearSearchValue(index) {
    const searchArray = [...searchValue];
    searchArray[index] = '';
    setSearchValue([...searchArray]);
  }
  function isQueryEnabled() {
    if (!token) {
      return false;
    }
    const regExp = '[a-z0-9]+@[a-z]+\\.[a-z]{2,3}';
    const userData = search.match(regExp);
    if (userData) {
      return true;
    }
    return false;
  }
  const {
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['allUsers', search],
    queryFn: () => teamProjectApi.getUserByEmail(search, token),
    enabled: isQueryEnabled(),
  });
  const {
    mutateAsync,
    isError: isErrorInvite,
    error: errorInvite,
    isLoading: isLoadingInvite,
    isSuccess,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.sendInvitations(values, token),
  });
  async function valuesPrepareHandler(values) {
    const invitations = { ...values, surveyId };
    await mutateAsync(invitations);
  }
  const debouncedSearchValue = useDebounce(
    searchValue[currentIndex] || '',
    1500,
  );
  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);
  if (isLoadingInvite) {
    return (
      <MainWrap>
        <div className={styles.invitationPage}>
          <Loader />
        </div>
      </MainWrap>
    );
  }
  if (isErrorInvite) {
    return (
      <MainWrap>
        <div className={styles.invitationPage}>
          <div className={styles.errorMessage}>{errorInvite.message}</div>
        </div>
      </MainWrap>
    );
  }
  if (isSuccess) {
    return (
      <MainWrap>
        <div className={styles.invitationPage}>
          <div className={styles.successMessage}>Приглашения успешно отправлены</div>
        </div>
      </MainWrap>
    );
  }
  return (
    <MainWrap>
      <div className={styles.invitationPage}>
        <h1 className={styles.pageTitle}>
          Пригласить других пользователей пройти опрос
        </h1>
        <Formik
          initialValues={{
            users: [usersGroup],
          }}
          validationSchema={InviteUsersValidationScheme}
          onSubmit={async (values) => {
            valuesPrepareHandler(values);
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form className={styles.formWrapper}>
              <FieldArray name="users">
                {({ push, remove }) => (
                  <div className={styles.usersWrapper}>
                    {values.users.map((_, index) => (
                      <div
                        className={styles.user}
                        key={index}
                      >
                        <div className={styles.userInputWrapper}>
                          <div className={styles.inputWrapper}>
                            <Field
                              type="email"
                              name={`users.${index}.email`}
                              placeholder="укажите email пользователя"
                              className={styles.field}
                              value={searchValue[index] || ''}
                              onChange={(event) => changeSearchHandler(event, index)}
                              onBlur={() => setFieldValue(
                                `users.${index}.email`,
                                searchValue[index],
                              )}
                            />
                            <button
                              type="button"
                              title="очистить поле"
                              onClick={() => clearSearchValue(index)}
                              className={styles.buttonClear}
                            >
                              <i className="fa-solid fa-xmark" />
                            </button>
                          </div>
                        </div>
                        {index > 0 && (
                          <div className={styles.buttonDelete}>
                            <ButtonGrey
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Удалить
                            </ButtonGrey>
                          </div>
                        )}
                        <ErrorMessage
                          className={styles.validationMessage}
                          name={`users.${index}.email`}
                          component="div"
                        />
                      </div>
                    ))}
                    {isFetching && <Loader />}
                    {isError && (
                      <div className={styles.errorMessage}>{error.message}</div>
                    )}
                    <ButtonPurple
                      type="button"
                      onClick={() => push(usersGroup)}
                    >
                      Добавить пользователя
                    </ButtonPurple>
                  </div>
                )}
              </FieldArray>
              <ButtonPurple
                type="submit"
                disabled={!isValid}
              >
                Отправить приглашения
              </ButtonPurple>
            </Form>
          )}
        </Formik>
      </div>
    </MainWrap>
  );
}
