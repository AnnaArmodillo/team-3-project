/* eslint-disable react/no-array-index-key */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ErrorMessage, Field, FieldArray, Form, Formik,
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
    if (!!token && !!search) {
      return true;
    }
    return false;
  }
  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['allUsers', search],
    queryFn: () => teamProjectApi.getUsersByEmail(search, token),
    enabled: isQueryEnabled(),
  });
  const {
    mutateAsync,
    isError: isErrorInvite,
    error: errorInvite,
    isLoading: isLoadingInvite,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.sendInvitations(values, token),
  });
  async function valuesPrepareHandler(values) {
    const invitations = { ...values, surveyId };
    await mutateAsync(invitations);
  }
  const debouncedSearchValue = useDebounce(searchValue[currentIndex] || '', 1000);
  useEffect(() => {
    setSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);
  useEffect(() => {
    if (typeof users === 'string') {
      console.log(users);
      console.log({ currentIndex });
      const searchArray = [...searchValue];
      searchArray[currentIndex] = users;
      setSearchValue([...searchArray]);
      setSearch('');
    }
  }, [users]);
  console.log(searchValue[currentIndex]);
  console.log(search);
  console.log(isErrorInvite, isLoadingInvite, errorInvite);
  return (
    <MainWrap>
      <div className={styles.invitationPage}>
        <h1 className={styles.pageTitle}>Пригласить других пользователей пройти опрос</h1>
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
            <Form
              className={styles.formWrapper}
            >
              <FieldArray name="users">
                {({ push, remove }) => (
                  <div className={styles.usersWrapper}>
                    {values.users.map((_, index) => (
                      <div
                        className={styles.user}
                        key={index}
                      >
                        <div className={styles.inputWrapper}>
                          <Field
                            type="email"
                            name={`users.${index}.email`}
                            placeholder="укажите email пользователя"
                            className={styles.field}
                            value={searchValue[index] || ''}
                            onChange={(event) => changeSearchHandler(event, index)}
                            list="emails"
                            onBlur={() => setFieldValue(`users.${index}.email`, searchValue[index])}
                          />
                          {users && typeof users === 'object' && (
                            <datalist
                              id="emails"
                            >
                              {users
                                && users.map((user) => (
                                  <option
                                    key={user}
                                    value={user}
                                  >
                                    {user}
                                  </option>
                                ))}
                            </datalist>
                          )}
                          <ErrorMessage
                            className={styles.validationMessage}
                            name={`users.${index}`}
                            component="div"
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
                        {index > 0 && (
                          <ButtonGrey
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Удалить
                          </ButtonGrey>
                        )}
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
