import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Formik } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { takeSurveyValidationScheme } from '../../../utils/validators';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { withQuery } from '../../HOCs/withQuery';
import { Loader } from '../../Loader/Loader';
import { OptionCard } from '../../organisms/OptionCard/OptionCard';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './singleChoiceSurvey.module.css';

function SingleChoiceSurveyPageInner({ scSurvey, surveyId, accessToken }) {
  const { id: userId } = useSelector(getUserSelector);
  const queryClient = useQueryClient();
  if (!scSurvey) console.log('No scData');

  const {
    mutateAsync: sendSurveyResponse, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.takeSurveyById(surveyId, values, accessToken),
  });
  if (isError) {
    console.log('Произошла ошибка при отправке ответа на опрос', error);
    return (
      <MainWrap>
        <div className={styles.message}>{error?.message}</div>
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
  // console.log('scSurvey.done.includes(userId)', scSurvey.done.includes(userId));
  function isAvailable() {
    return !(scSurvey.done.includes(userId));
  }
  // console.log('isAvailable()', isAvailable());
  const submitHandler = async (values) => {
    console.log({ values });
    const response = await sendSurveyResponse(values);
    console.log(response);
    if (response) {
      queryClient.invalidateQueries({
        queryKey: ['scSurvey', surveyId],
      });
    }
  };

  return (
    <MainWrap>
      <div className={styles.singleChoiceSurveyPage}>
        <h1>{scSurvey.title}</h1>
        {!isAvailable() && <div>Вы уже проголосовали в этом опросе</div>}

        <Formik
          initialValues={{
            checked: '',
          }}
          validationSchema={takeSurveyValidationScheme}
          onSubmit={submitHandler}
        >
          {(formik) => {
            const { isValid } = formik;
            console.log({ isValid });
            return (
              <Form className={styles.form}>
                <div
                  role="group"
                  className={styles.optionsWrapper}
                >
                  {scSurvey.options.map((option) => (
                    <OptionCard
                      key={option.optionId}
                      option={option}
                      isAvailable={isAvailable()}
                      surveyType="SC"
                    />
                  ))}
                </div>
                <ErrorMessage
                  className={styles.validationMessage}
                  name="checked"
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

const SingleChoiceSurveyPageInnerWithQuery = withQuery(SingleChoiceSurveyPageInner);

export function SingleChoiceSurveyPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessTokenSelector);
  const { surveyId } = useParams();

  const {
    data: scSurvey, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['scSurvey', surveyId],
    queryFn: () => teamProjectApi.getSurveyById(surveyId, accessToken),
    skip: !accessToken,
  });
  // console.log({ scSurvey });
  useEffect(() => {
    if (!accessToken) {
      navigate('/signin', {
        state: {
          from: pathname,
        },
      });
    }
  }, [accessToken]);

  return (
    <SingleChoiceSurveyPageInnerWithQuery
      scSurvey={scSurvey}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      surveyId={surveyId}
      accessToken={accessToken}
    />
  );
}
