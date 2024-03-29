/* eslint-disable react/no-array-index-key */
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newSurveyValidationScheme } from '../../../utils/validators';
import styles from './newSurveyCreating.module.css';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { Loader } from '../../Loader/Loader';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import surveyImage from '../../../images/survey_orange.png';
import { getSurveyURL } from '../../../utils/helper';
import { FormSaver } from '../../organisms/FormSaver/FormSaver';
import { setSurvey } from '../../../redux/slices/surveySlice';
import { MC, SC, UC } from '../../../utils/constants';
import placeholderImage from '../../../images/placeholder_image.png';
import { CopyLinkButton } from '../../atoms/CopyLinkButton/CopyLinkButton';
import { ButtonLightPurple } from '../../atoms/ButtonLightPurple/ButtonLightPurple';

export function NewSurveyCreating() {
  const token = useSelector(getAccessTokenSelector);
  const optionsGroup = {
    optionTitle: '',
    activeLink: '',
  };
  const LS_FORM_SAVER_KEY = 'Armadillo_NewSurveyForm';
  const [selectedFile, setSelectedFile] = useState('');
  const textAreaRef = useRef(null);
  const [imageContent, setImageContent] = useState([]);
  const [imageLinkValues, setImageLinkValues] = useState([]);
  const [surveyId, setSurveyID] = useState();
  const [currentIndex, setCurrentIndex] = useState('');
  const filePicker = useRef();
  const formData = new FormData();
  const dispatch = useDispatch();
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (preparedValues) => teamProjectApi.addNewSurvey(preparedValues, token)
      .then((result) => {
        setSurveyID(result.surveyId);
        localStorage.removeItem(LS_FORM_SAVER_KEY);
      }),
  });
  const {
    mutateAsync: mutateAsyncUpload,
    isError: isErrorUpload,
    error: errorUpload,
    isLoading: isLoadingUpload,
  } = useMutation({
    mutationFn: (data) => teamProjectApi.uploadFile(data, token),
  });
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  async function uploadHandler(index) {
    setCurrentIndex(index);
    formData.append('image', selectedFile);
    formData.getAll('files');
    const res = await mutateAsyncUpload(formData);
    if (
      res
      !== 'Не выбран файл для загрузки, либо его тип не соответствует типу изображения'
    ) {
      const blob = new Blob([selectedFile], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const imageArray = [...imageContent];
      const linksArray = [...imageLinkValues];
      imageArray[index] = url;
      linksArray[index] = res;
      setImageContent([...imageArray]);
      setImageLinkValues([...linksArray]);
    }
    setSelectedFile('');
  }
  const handlePick = (event) => {
    if (!event.target.closest('button') && !event.target.closest('i')) {
      filePicker.current.click();
    }
  };
  function deletePreviousLink() {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[currentIndex] = '';
    linksArray[currentIndex] = '';
    setImageContent([...imageArray]);
    setImageLinkValues([...linksArray]);
    setImageLinkValues([...linksArray]);
  }
  useEffect(() => {
    if (isErrorUpload) {
      deletePreviousLink();
    }
  }, [isErrorUpload]);
  function deleteImageHandler(index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = '';
    linksArray[index] = '';
    setImageContent([...imageArray]);
    setImageLinkValues([...linksArray]);
    setImageLinkValues([...linksArray]);
  }
  function changeImageLinkHandler(event, index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = event.target.value;
    linksArray[index] = event.target.value;
    setImageContent([...imageArray]);
    setImageLinkValues([...linksArray]);
  }
  async function valuesPrepareHandler(values) {
    const preparedValues = {
      ...values,
      options: [...values.options].map((option, index) => ({
        ...option,
        image: imageLinkValues[index] || '',
      })),
    };
    setImageContent(['']);
    setImageLinkValues(['']);
    await mutateAsync(preparedValues);
  }
  function deleteWithOptionHandler(index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    setImageContent([
      ...imageArray.slice(0, index),
      ...imageArray.slice(index + 1),
    ]);
    setImageLinkValues([
      ...linksArray.slice(0, index),
      ...linksArray.slice(index + 1),
    ]);
  }
  useEffect(() => {
    if (surveyId) {
      dispatch(setSurvey(surveyId));
    }
  }, [surveyId]);
  if (isLoading) {
    return (
      <MainWrap>
        <Loader />
      </MainWrap>
    );
  }
  if (isError) {
    return (
      <MainWrap>
        <div className={styles.errorMessage}>{error.message}</div>
      </MainWrap>
    );
  }
  if (surveyId) {
    return (
      <MainWrap>
        <div className={styles.pageSuccess}>
          <div className={styles.messageWrapper}>
            <div className={styles.successMessage}>
              Готово! Созданный опрос доступен по ссылке:
              {' '}
              <p
                className={styles.surveyLink}
                ref={textAreaRef}
              >
                {getSurveyURL(surveyId)}
                {' '}
                <CopyLinkButton surveyId={surveyId} />
              </p>
            </div>
            <div className={styles.buttonsWrapper}>
              <Link to={getSurveyURL(surveyId)}>
                <ButtonPurple>Перейти к опросу</ButtonPurple>
              </Link>
              <ButtonPurple
                type="button"
                onClick={() => window.location.reload()}
              >
                Новый опрос
              </ButtonPurple>
            </div>
            <Link to="/invitation">
              <ButtonPurple>
                Пригласить других пользователей пройти опрос
              </ButtonPurple>
            </Link>
          </div>
          <div className={styles.surveyImage}>
            <img
              src={surveyImage}
              alt="изображение"
            />
          </div>
        </div>
      </MainWrap>
    );
  }
  return (
    <MainWrap>
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Создание нового опроса</h1>
        <Formik
          initialValues={{
            surveyTitle: '',
            surveyType: '',
            options: [optionsGroup],
            allowExtraOption: false,
          }}
          validationSchema={newSurveyValidationScheme}
          onSubmit={async (values) => {
            valuesPrepareHandler(values);
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form className={styles.formWrapper}>
              <FormSaver
                name={LS_FORM_SAVER_KEY}
                imageContent={imageContent}
                imageLinkValues={imageLinkValues}
                setImageContent={setImageContent}
                setImageLinkValues={setImageLinkValues}
              />
              <Field
                className={styles.field}
                type="text"
                name="surveyTitle"
                placeholder="заголовок опроса"
              />
              <ErrorMessage
                className={styles.validationMessage}
                name="surveyTitle"
                component="div"
              />
              <div id="surveyTypeGroup">
                <h4 className={styles.text}>Тип опроса</h4>
              </div>
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className={styles.typeWrapper}
              >
                <Field
                  type="radio"
                  name="surveyType"
                  value={SC}
                  id={SC}
                />
                <label
                  htmlFor={SC}
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
                  value={MC}
                  id={MC}
                />
                <label
                  htmlFor={MC}
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
                  value={UC}
                  id={UC}
                />
                <label
                  htmlFor={UC}
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
                className={styles.validationMessage}
                name="surveyType"
                component="div"
              />
              <h4 className={styles.text}>Варианты ответов:</h4>
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
                            className={styles.field}
                          />
                          <ErrorMessage
                            className={styles.validationMessage}
                            name={`options.${index}.optionTitle`}
                            component="div"
                          />
                          <div className={styles.activeLinkWrapper}>
                            <Field
                              type="text"
                              name={`options.${index}.activeLink`}
                              placeholder="ссылка для просмотра"
                              id="activeLink"
                              className={styles.field}
                            />
                            <button
                              type="button"
                              title="очистить поле"
                              onClick={() => setFieldValue(`options.${index}.activeLink`, '')}
                              className={styles.buttonClear}
                            >
                              <i className="fa-solid fa-xmark" />
                            </button>
                          </div>
                          <ErrorMessage
                            className={styles.validationMessage}
                            name={`options.${index}.activeLink`}
                            component="div"
                          />
                          <input
                            type="text"
                            placeholder="ссылка на изображение"
                            onChange={(event) => changeImageLinkHandler(event, index)}
                            value={imageLinkValues[index] || ''}
                            className={styles.field}
                          />
                          <ErrorMessage
                            className={styles.validationMessage}
                            name={`options.${index}.linkurl`}
                            component="div"
                          />
                          <input
                            className={styles.hidden}
                            encType="multipart/form-data"
                            type="file"
                            ref={filePicker}
                            onChange={handleChange}
                          />
                        </div>
                        <div
                          className={styles.image}
                          onClick={handlePick}
                          title="загрузить файл"
                        >
                          {isErrorUpload
                            && !isLoadingUpload
                            && currentIndex === index && (
                              <div className={styles.messageImage}>
                                {errorUpload.message}
                              </div>
                          )}
                          {isErrorUpload
                            && !isLoadingUpload
                            && currentIndex !== index && (
                              <img
                                src={imageContent[index] || placeholderImage}
                                alt="добавьте изображение"
                              />
                          )}
                          {isLoadingUpload && currentIndex === index && (
                            <Loader />
                          )}
                          {isLoadingUpload && currentIndex !== index && (
                            <img
                              src={imageContent[index] || placeholderImage}
                              alt="добавьте изображение"
                            />
                          )}
                          {imageContent[index] && (
                            <button
                              type="button"
                              title="удалить файл"
                              className={styles.buttonImageDelete}
                              onClick={() => deleteImageHandler(index)}
                            >
                              <i className="fa-solid fa-xmark" />
                            </button>
                          )}
                          {!isLoadingUpload && !isErrorUpload && (
                            <img
                              src={imageContent[index] || placeholderImage}
                              alt="добавьте изображение"
                            />
                          )}
                        </div>
                        {selectedFile !== '' && (
                        <ButtonLightPurple
                          type="button"
                          className={styles.buttonUpload}
                          onClick={() => uploadHandler(index)}
                        >
                          Загрузить файл
                        </ButtonLightPurple>
                        )}
                        {index > 0 && (
                          <ButtonGrey
                            type="button"
                            className={styles.buttonDeleteOption}
                            onClick={() => {
                              deleteWithOptionHandler(index);
                              remove(index);
                            }}
                          >
                            Удалить этот вариант
                          </ButtonGrey>
                        )}
                      </div>
                    ))}
                    <ButtonPurple
                      type="button"
                      onClick={() => push(optionsGroup)}
                    >
                      Добавить вариант ответа
                    </ButtonPurple>
                  </div>
                )}
              </FieldArray>
              {/* <div className={styles.allowExtraOption}>
                <Field
                  type="checkbox"
                  name="allowExtraOption"
                  id="allowExtraOption"
                />
                <label htmlFor="allowExtraOption">
                  Разрешить участникам выбор своего варианта
                </label>
              </div> */}
              <ButtonPurple
                type="submit"
                disabled={!isValid}
              >
                Сформировать ссылку на опрос
              </ButtonPurple>
            </Form>
          )}
        </Formik>
      </div>
    </MainWrap>
  );
}
