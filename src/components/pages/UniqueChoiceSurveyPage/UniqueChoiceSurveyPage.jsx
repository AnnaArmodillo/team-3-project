import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { OptionCard } from '../../organisms/OptionCard/OptionCard';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './uniqueChoiceSurvey.module.css';
import { takeSurveyValidationScheme } from '../../../utils/validators';
import { Loader } from '../../Loader/Loader';

export function UniqueChoiceSurveyPage() {
  const { surveyId } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useSelector(getUserSelector);
  const accessToken = useSelector(getAccessTokenSelector);
  useEffect(() => {
    if (!accessToken) {
      navigate('/signin', {
        state: {
          from: pathname,
        },
      });
    }
  });
  const {
    data: survey,
    isError: isErrorSurvey,
    error: errorSurvey,
    isLoading: isLoadingSurvey,
  } = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: () => teamProjectApi.getSurveyById(surveyId, accessToken),
  });
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.takeSurveyById(surveyId, values, accessToken),
  });
  async function submitHandler(values) {
    await mutateAsync(values);
    queryClient.invalidateQueries({
      queryKey: ['survey', surveyId],
    });
  }
  function isAvailable() {
    if (survey.done.includes(id) || survey.options.some((option) => option.checked === id)) {
      return false;
    }
    return true;
  }
  if (isErrorSurvey || isError) {
    return (
      <MainWrap>
        <div className={styles.message}>{errorSurvey?.message || error?.message}</div>
      </MainWrap>
    );
  }
  if (isLoadingSurvey || isLoading) {
    return (
      <MainWrap>
        <Loader />
      </MainWrap>
    );
  }
  return (
    <MainWrap>
      <div className={styles.surveyPage}>
        <h1>{survey.title}</h1>
        {!isAvailable() && <div>Вы уже проголосовали в этом опросе</div>}
        <Formik
          initialValues={{
            checked: '',
          }}
          validationSchema={takeSurveyValidationScheme}
          onSubmit={async (values) => {
            submitHandler(values);
          }}
        >
          {(formik) => {
            const { isValid } = formik;
            return (
              <Form className={styles.form}>
                <div
                  role="group"
                  className={styles.optionsWrapper}
                >
                  {survey.options.map((option) => (
                    <OptionCard
                      key={option.optionId}
                      option={option}
                      isAvailable={isAvailable()}
                    />
                  ))}
                </div>
                <ErrorMessage
                  className={styles.validationMessage}
                  name="option"
                  component="div"
                />
                <ButtonPurple
                  type="submit"
                  disabled={!isValid || !isAvailable()}
                >
                  Подтвердить выбор
                </ButtonPurple>
              </Form>
            );
          }}
        </Formik>
      </div>
    </MainWrap>
  );
}
