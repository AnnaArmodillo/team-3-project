import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
  getUserSelector,
} from '../../../redux/slices/userSlice';
import { OptionCard } from '../../organisms/OptionCard/OptionCard';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './uniqueChoiceSurvey.module.css';
import { takeSurveyValidationScheme } from '../../../utils/validators';
import { Loader } from '../../Loader/Loader';
import { ThankYouForVotingMessage }
  from '../../molecules/ThankYouForVotingMessage/ThankYouForVotingMessage';
import { SurveyTypeInfo } from '../../atoms/SurveyTypeInfo/SurveyTypeInfo';
import { UC, getQueryKeyUCSurvey } from '../../../utils/constants';
import { SurveyTotalVotes } from '../../atoms/SurveyTotalVotes/SurveyTotalVotes';
import { setSurvey } from '../../../redux/slices/surveySlice';
import { InvitationPageLink } from '../../organisms/InvitationPageLink/InvitationPageLink';

export function UniqueChoiceSurveyPage() {
  const { surveyId } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useSelector(getUserSelector);
  const accessToken = useSelector(getAccessTokenSelector);
  const dispatch = useDispatch();
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
    isLoading: isLoadingSurvey,
  } = useQuery({
    queryKey: getQueryKeyUCSurvey(surveyId),
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
      queryKey: getQueryKeyUCSurvey(surveyId),
    });
  }
  useEffect(() => {
    if (surveyId) {
      dispatch(setSurvey(surveyId));
    }
  }, [surveyId]);
  function isAvailable() {
    if (
      survey.done.includes(id)
      || survey.options.some((option) => option.checked === id)
    ) {
      return false;
    }
    return true;
  }
  if (isErrorSurvey) {
    return (
      <MainWrap>
        <div className={styles.surveyPage}>
          <div className={styles.message}>
            <p>Данные опроса не получены</p>
          </div>
        </div>
      </MainWrap>
    );
  }
  if (isError) {
    return (
      <MainWrap>
        <div className={styles.surveyPage}>
          <div className={styles.message}>{error.message}</div>
        </div>
      </MainWrap>
    );
  }
  if (isLoadingSurvey || isLoading) {
    return (
      <MainWrap>
        <div className={styles.surveyPage}>
          <Loader />
        </div>
      </MainWrap>
    );
  }
  const votesTotal = survey.done.length;
  return (
    <MainWrap>
      <div className={styles.surveyPage}>
        <h1>{survey.title}</h1>
        {!isAvailable() ? (
          <ThankYouForVotingMessage />
        ) : (
          <SurveyTypeInfo surveyType={UC} />
        )}
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
                      surveyType="UC"
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
        <SurveyTotalVotes counter={votesTotal} />
        <InvitationPageLink author={survey.author} id={id} />
      </div>
    </MainWrap>
  );
}
