import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Form, ErrorMessage, Formik,
} from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { MC } from '../../../utils/constants';
import { takeMCSurveyValidationScheme } from '../../../utils/validators';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { SurveyTypeInfo } from '../../atoms/SurveyTypeInfo/SurveyTypeInfo';
import { withQuery } from '../../HOCs/withQuery';
import { Loader } from '../../Loader/Loader';
import {
  ThankYouForVotingMessage,
} from '../../molecules/ThankYouForVotingMessage/ThankYouForVotingMessage';
import { OptionCard } from '../../organisms/OptionCard/OptionCard';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './multipleChoiceSurvey.module.css';

function MultipleChoiceSurveyPageInner({ mcSurvey, surveyId, accessToken }) {
  const { id: userId } = useSelector(getUserSelector);
  const queryClient = useQueryClient();
  if (!mcSurvey) {
    return (
      <MainWrap>
        <div className={styles.multipleChoiceSurveyPage}>
          <div className={styles.message}>
            <p>Данные опроса не получены</p>
          </div>
        </div>
      </MainWrap>
    );
  }

  const {
    mutateAsync: sendSurveyResponse, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.takeSurveyById(surveyId, values, accessToken),
  });
  if (isError) {
    return (
      <MainWrap>
        <div className={styles.multipleChoiceSurveyPage}>
          <div className={styles.message}>{error?.message}</div>
        </div>
      </MainWrap>
    );
  }
  if (isLoading) {
    return (
      <MainWrap>
        <div className={styles.multipleChoiceSurveyPage}>
          <Loader />
        </div>
      </MainWrap>
    );
  }

  function isAvailable() {
    return !(mcSurvey.done.includes(userId));
  }
  const submitHandler = async (values) => {
    const response = await sendSurveyResponse(values);
    if (response.done.includes(userId)) {
      queryClient.invalidateQueries({
        queryKey: ['mcSurvey', surveyId],
      });
    }
  };

  return (
    <MainWrap>
      <div className={styles.multipleChoiceSurveyPage}>
        <h1>{mcSurvey.title}</h1>
        {!isAvailable()
          ? (
            <ThankYouForVotingMessage />
          )
          : (
            <SurveyTypeInfo surveyType={MC} />
          )}

        <Formik
          initialValues={{
            toggle: false,
            checked: [],
          }}
          validationSchema={takeMCSurveyValidationScheme}
          onSubmit={submitHandler}
        >
          {(formik) => {
            const { isValid } = formik;
            return (
              <Form className={styles.form}>
                <div
                  role="group"
                  className={styles.optionsWrapper}
                >
                  {mcSurvey.options.map((option) => (
                    <OptionCard
                      key={option.optionId}
                      option={option}
                      isAvailable={isAvailable()}
                      surveyType="MC"
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

const MultipleChoiceSurveyPageInnerWithQuery = withQuery(MultipleChoiceSurveyPageInner);

export function MultipleChoiceSurveyPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessTokenSelector);
  const { surveyId } = useParams();

  const {
    data: mcSurvey, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['mcSurvey', surveyId],
    queryFn: () => teamProjectApi.getSurveyById(surveyId, accessToken),
    skip: !accessToken,
  });
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
    <MultipleChoiceSurveyPageInnerWithQuery
      mcSurvey={mcSurvey}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      surveyId={surveyId}
      accessToken={accessToken}
    />
  );
}
