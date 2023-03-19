/* eslint-disable react/no-array-index-key */
import {
  ErrorMessage,
  Field, FieldArray, Form, Formik,
} from 'formik';
import { InviteUsersValidationScheme } from '../../../utils/validators';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './invitationPage.module.css';

export function InvitationPage() {
  const usersGroup = [];
  function valuesPrepareHandler(values) {
    console.log(values);
  }
  return (
    <MainWrap>
      <div className={styles.invitationPage}>
        <h1 className={styles.pageTitle}>Пригласить участников пройти опрос</h1>
        <Formik
          initialValues={{
            users: [usersGroup],
          }}
          validationSchema={InviteUsersValidationScheme}
          onSubmit={async (values) => {
            valuesPrepareHandler(values);
          }}
        >
          {({
            values, isValid, setFieldValue,
          }) => (
            <Form className={styles.formWrapper}>
              <FieldArray name="users">
                {({ push, remove }) => (
                  <div className={styles.usersWrapper}>
                    {values.users.map((_, index) => (
                      <div
                        className={styles.user}
                        key={index}
                      >
                        <div className={styles.inputWrapper}>
                          <div className={styles.userEmailWrapper}>
                            <Field
                              type="email"
                              name={`users.${index}`}
                              placeholder="укажите email пользователя"
                              id="email"
                              className={styles.field}
                            />
                            <ErrorMessage
                              className={styles.validationMessage}
                              name={`users.${index}`}
                              component="div"
                            />
                            <button
                              type="button"
                              title="очистить поле"
                              onClick={() => setFieldValue(`users.${index}`, '')}
                              className={styles.buttonClear}
                            >
                              <i className="fa-solid fa-xmark" />
                            </button>
                          </div>
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
