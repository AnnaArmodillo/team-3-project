import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Form, ErrorMessage, Formik,
} from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { setSurvey } from '../../../redux/slices/surveySlice';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { MC } from '../../../utils/constants';
import { getOptionSuccessRate } from '../../../utils/helper';
import { takeMCSurveyValidationScheme } from '../../../utils/validators';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { SurveyOptionResult } from '../../atoms/SurveyOptionResult/SurveyOptionResult';
import { SurveyTotalVotes } from '../../atoms/SurveyTotalVotes/SurveyTotalVotes';
import { SurveyTypeInfo } from '../../atoms/SurveyTypeInfo/SurveyTypeInfo';
import { withQuery } from '../../HOCs/withQuery';
import { withScrollToTop } from '../../HOCs/withScrollToTop';
import { Loader } from '../../Loader/Loader';
import {
  ThankYouForVotingMessage,
} from '../../molecules/ThankYouForVotingMessage/ThankYouForVotingMessage';
import { InvitationPageLink } from '../../organisms/InvitationPageLink/InvitationPageLink';
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

  const votesTotal = mcSurvey.done.length;

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
                    <div key={option.optionId} className={styles.option}>
                      <div className={styles.optionCard}>
                        <OptionCard
                          option={option}
                          isAvailable={isAvailable()}
                          surveyType={MC}
                        />
                      </div>
                      <SurveyOptionResult
                        successRate={getOptionSuccessRate(option.checked.length, votesTotal)}
                        votesNumber={option.checked.length}
                      />
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  className={styles.validationMessage}
                  name="checked"
                  component="div"
                />
                <div className={styles.btnWr}>
                  <ButtonPurple
                    type="submit"
                    disabled={!isValid || !isAvailable()}
                  >
                    Подтвердить выбор
                  </ButtonPurple>
                </div>
              </Form>
            );
          }}
        </Formik>
        <SurveyTotalVotes counter={votesTotal} />
        <InvitationPageLink author={mcSurvey.author} id={userId} />
      </div>
    </MainWrap>
  );
}

const MultipleChoiceSurveyPageInnerWithQuery = withQuery(MultipleChoiceSurveyPageInner);

function MultipleChoiceSurveyPageWithQuery() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessTokenSelector);
  const { surveyId } = useParams();
  const dispatch = useDispatch();

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
  useEffect(() => {
    if (surveyId) {
      dispatch(setSurvey(surveyId));
    }
  }, [surveyId]);

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

const MultipleChoiceSurveyPageWithScrollToTop = withScrollToTop(MultipleChoiceSurveyPageWithQuery);

export function MultipleChoiceSurveyPage() {
  return (
    <MultipleChoiceSurveyPageWithScrollToTop />
  );
}
