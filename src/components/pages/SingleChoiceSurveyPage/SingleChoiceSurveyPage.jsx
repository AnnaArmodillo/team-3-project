import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, ErrorMessage, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { setSurvey } from '../../../redux/slices/surveySlice';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { getQueryKeySСSurvey, SC } from '../../../utils/constants';
import { getOptionSuccessRate } from '../../../utils/helper';
import { takeSurveyValidationScheme } from '../../../utils/validators';
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
import styles from './singleChoiceSurvey.module.css';

function SingleChoiceSurveyPageInner({ scSurvey, surveyId, accessToken }) {
  const { id: userId } = useSelector(getUserSelector);
  const queryClient = useQueryClient();
  if (!scSurvey) {
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

  const votesTotal = scSurvey.done.length;

  const {
    mutateAsync: sendSurveyResponse, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.takeSurveyById(surveyId, values, accessToken),
  });
  if (isError) {
    return (
      <MainWrap>
        <div className={styles.message}>{error?.message}</div>
      </MainWrap>
    );
  }
  if (isLoading) {
    return (
      <MainWrap>
        <div className={styles.singleChoiceSurveyPage}>
          <Loader />
        </div>
      </MainWrap>
    );
  }

  function isAvailable() {
    return !(scSurvey.done.includes(userId));
  }
  const submitHandler = async (values) => {
    const response = await sendSurveyResponse(values);
    if (response.done.includes(userId)) {
      queryClient.invalidateQueries({
        queryKey: ['scSurvey', surveyId],
      });
    }
  };

  return (
    <MainWrap>
      <div className={styles.singleChoiceSurveyPage}>
        <h1>{scSurvey.title}</h1>
        {!isAvailable() ? (
          <ThankYouForVotingMessage />
        ) : (
          <SurveyTypeInfo surveyType={SC} />
        )}

        <Formik
          initialValues={{
            checked: '',
          }}
          validationSchema={takeSurveyValidationScheme}
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
                  {scSurvey.options.map((option) => (
                    <div key={option.optionId} className={styles.option}>
                      <div className={styles.optionCard}>
                        <OptionCard
                          option={option}
                          isAvailable={isAvailable()}
                          surveyType={SC}
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
        <InvitationPageLink author={scSurvey.author} id={userId} />
      </div>
    </MainWrap>
  );
}

const SingleChoiceSurveyPageInnerWithQuery = withQuery(SingleChoiceSurveyPageInner);

function SingleChoiceSurveyPageWithQuery() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessTokenSelector);
  const { surveyId } = useParams();
  const dispatch = useDispatch();

  const {
    data: scSurvey, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQueryKeySСSurvey(surveyId),
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

const SingleChoiceSurveyPageWithScrollToTop = withScrollToTop(SingleChoiceSurveyPageWithQuery);

export function SingleChoiceSurveyPage() {
  return (
    <SingleChoiceSurveyPageWithScrollToTop />
  );
}
