/* eslint-disable react/no-array-index-key */
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { validationScheme } from './validator';
import styles from './newSurveyCreating.module.css';

export function NewSurveyCreating() {
  const optionsGroup = {
    optionTitle: '',
    activeLink: '',
    linkurl: '',
    image: '',
  };

  return (
    <div className={styles.newSurveyCreatingPage}>
      <h1>Создание нового опроса</h1>
      <Formik
        initialValues={{
          surveyTitle: '',
          surveyType: '',
          options: [optionsGroup],
          allowExtraOption: false,
        }}
        validationSchema={validationScheme}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className={styles.formWrapper}>
            <Field
              className={styles.surveyTitle}
              type="text"
              name="surveyTitle"
              placeholder="заголовок опроса"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="surveyTitle"
              component="div"
            />
            <div id="surveyTypeGroup">
              <h4>Тип опроса</h4>
            </div>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className={styles.typeWrapper}
            >
              <Field
                type="radio"
                name="surveyType"
                value="SC"
                id="SC"
              />
              <label
                htmlFor="SC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Единственный выбор</div>
                <div className={styles.typeDescription}>
                  Выбор большинством голосов, где каждый участник может
                  проголосовать только за один вариант ответа
                </div>
              </label>
              <Field
                type="radio"
                name="surveyType"
                value="MC"
                id="MC"
              />
              <label
                htmlFor="MC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Множественный выбор</div>
                <div className={styles.typeDescription}>
                  Выбор большинством голосов, где каждый участник может
                  проголосовать за несколько вариантов ответа
                </div>
              </label>
              <Field
                type="radio"
                name="surveyType"
                value="UC"
                id="UC"
              />
              <label
                htmlFor="UC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Уникальный выбор</div>
                <div className={styles.typeDescription}>
                  Каждый из вариантов ответов может быть выбран не более, чем
                  одним участником
                </div>
              </label>
            </div>
            <ErrorMessage
              className={styles.errorMessage}
              name="surveyType"
              component="div"
            />
            <h4>Варианты ответов:</h4>
            <FieldArray name="options">
              {({ push, remove }) => (
                <div className={styles.optionWrapper}>
                  {values.options.map((_, index) => (
                    <div
                      className={styles.option}
                      key={index}
                    >
                      <div className={styles.optionInputWrapper}>
                        <Field
                          type="text"
                          name={`options.${index}.optionTitle`}
                          placeholder="вариант ответа"
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.optionTitle`}
                          component="div"
                        />
                        <Field
                          type="text"
                          name={`options.${index}.activeLink`}
                          placeholder="ссылка для просмотра"
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.activeLink`}
                          component="div"
                        />
                        <Field
                          type="text"
                          name={`options.${index}.linkurl`}
                          placeholder="ссылка на изображение"
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.linkurl`}
                          component="div"
                        />
                        <Field
                          type="file"
                          name={`options.${index}.image`}
                          placeholder="загрузить изображение"
                        />
                      </div>
                      <div className={styles.image}>image</div>
                      {index > 0 && (
                        <button
                          type="button"
                          className={styles.buttonDelete}
                          onClick={() => remove(index)}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  ))}
                  {' '}
                  <button
                    type="button"
                    className={styles.buttonAddOption}
                    onClick={() => push(optionsGroup)}
                  >
                    Добавить вариант ответа
                  </button>
                </div>
              )}
            </FieldArray>
            <div className={styles.allowExtraOption}>
              <Field
                type="checkbox"
                name="allowExtraOption"
                id="allowExtraOption"
              />
              <label htmlFor="allowExtraOption">
                Разрешить участникам выбор своего варианта
              </label>
            </div>
            <button
              type="submit"
              className={styles.buttonSubmit}
            >
              Сформировать ссылку на опрос
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
