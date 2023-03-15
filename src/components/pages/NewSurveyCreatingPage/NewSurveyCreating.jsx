/* eslint-disable react/no-array-index-key */
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newSurveyValidationScheme } from '../../../utils/validators';
import styles from './newSurveyCreating.module.css';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { Loader } from '../../Loader/Loader';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import surveyImage from '../../../images/survey_orange.png';

export function NewSurveyCreating() {
  // eslint-disable-next-line max-len
  const token = useSelector(getAccessTokenSelector);
  const optionsGroup = {
    optionTitle: '',
    activeLink: '',
  };
  const [selectedFile, setSelectedFile] = useState('');
  const [imageContent, setImageContent] = useState([]);
  const [imageLinkValues, setImageLinkValues] = useState([]);
  const [surveyId, setSurveyID] = useState();
  const filePicker = useRef();
  const formData = new FormData();
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (preparedValues) => teamProjectApi.addNewSurvey(preparedValues, token)
      .then((result) => {
        setSurveyID(result.surveyId);
      }),
  });
  function getRoute() {
    let route = '';
    switch (surveyId.slice(0, 2)) {
      case 'SC':
        route = 'sc';
        break;
      case 'MC':
        route = 'mc';
        break;
      case 'UC':
        route = 'uc';
        break;

      default:
        break;
    }
    return route;
  }
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
  const {
    mutateAsync: mutateAsyncImage,
    isLoading: isLoadingImage,
    isError: isErrorImage,
    error: errorImage,
  } = useMutation({
    mutationFn: (data) => teamProjectApi.getUploadedFile(data, token),
  });
  const getUploadedUrl = async (res, index) => {
    const resImg = await mutateAsyncImage(res);
    const blob = await resImg.blob();
    const url = window.URL.createObjectURL(blob);
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = url;
    linksArray[index] = res;
    setImageContent([...imageArray]);
    setImageLinkValues([...linksArray]);
  };
  async function uploadHandler(index) {
    formData.append('image', selectedFile);
    formData.getAll('files');
    const res = await mutateAsyncUpload(formData);
    setSelectedFile('');
    if (
      res
      !== 'Не выбран файл для загрузки, либо его тип не соответствует типу изображения'
    ) {
      getUploadedUrl(res, index);
    }
  }
  const handlePick = (event) => {
    if (!event.target.closest('button') && !event.target.closest('i')) {
      filePicker.current.click();
    }
  };
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
        <Link to={`/surveys/${getRoute()}/${surveyId}`}>
          <div className={styles.successMessage}>Готово! Перейти к новому опросу.</div>
        </Link>
        <div className={styles.surveyImage}>
          <img
            src={surveyImage}
            alt="изображение"
          />
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
          {({ values }) => (
            <Form className={styles.formWrapper}>
              <Field
                className={styles.surveyTitle}
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
                className={styles.validationMessage}
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
                            className={styles.validationMessage}
                            name={`options.${index}.optionTitle`}
                            component="div"
                          />
                          <Field
                            type="text"
                            name={`options.${index}.activeLink`}
                            placeholder="ссылка для просмотра"
                          />
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
                          {selectedFile !== '' && (
                            <ButtonWhite
                              type="button"
                              onClick={() => uploadHandler(index)}
                            >
                              Загрузить файл
                            </ButtonWhite>
                          )}
                        </div>
                        <div
                          className={styles.image}
                          onClick={handlePick}
                          title="загрузить файл"
                        >
                          {(isErrorUpload || isErrorImage)
                            && (!isLoadingUpload && !isLoadingImage) && (
                              <div className={styles.messageImage}>
                                {errorUpload?.message || errorImage?.message}
                              </div>
                          )}
                          {(isLoadingImage || isLoadingUpload) && <Loader />}
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
                          {!isLoadingImage
                            && !isLoadingUpload
                            && !isErrorImage
                            && !isErrorUpload && (
                              <img
                                src={imageContent[index] || ''}
                                alt="добавьте изображение"
                              />
                          )}
                        </div>
                        {index > 0 && (
                          <ButtonWhite
                            type="button"
                            className={styles.buttonDelete}
                            onClick={() => {
                              deleteWithOptionHandler(index);
                              remove(index);
                            }}
                          >
                            Удалить
                          </ButtonWhite>
                        )}
                      </div>
                    ))}
                    <ButtonPurple
                      type="button"
                      // className={styles.buttonAddOption}
                      onClick={() => push(optionsGroup)}
                    >
                      Добавить вариант ответа
                    </ButtonPurple>
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
              <ButtonPurple
                type="submit"
                className={styles.buttonSubmit}
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
