import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccessTokenSelector, getUserSelector } from '../../../redux/slices/userSlice';
import { getSurveyURL } from '../../../utils/helper';
import styles from './surveyItem.module.css';
// import avatar from '../../../images/avatar.png';
import { MC, SC, UC } from '../../../utils/constants';
import { teamProjectApi } from '../../../api/TeamProjectApi';

export function SurveyItem({ survey, isUserAuthor = false }) {
  const user = useSelector(getUserSelector);
  const accessToken = useSelector(getAccessTokenSelector);

  const isUserDone = survey.done.find((userId) => userId === user.id);
  // const isUserAuthor = survey.author === user.id;

  const client = useQueryClient();
  const {
    mutateAsync,
    // isLoading,
    // isError,
    // error,
  } = useMutation({
    mutationFn: () => teamProjectApi.deleteSurveyFromVisited(survey.surveyId, accessToken),
    onSuccess: () => { client.invalidateQueries({ queryKey: ['VisitedSurveysFetch'] }); },
  });

  const deleteFromVisited = (e) => {
    e.preventDefault();
    mutateAsync();
  };

  // const deleteFromMySurveys = (e) => {
  //   e.preventDefault();
  //   console.log('опрос удален из базы');
  // };

  const formatSurveysType = () => {
    let type = '';
    switch (survey.surveyType) {
      case SC:
        type = 'единственный тип выбора';
        break;
      case MC:
        type = 'множественный тип выбора';
        break;
      case UC:
        type = 'уникальный тип выбора';
        break;

      default:
        break;
    }
    return type;
  };

  return (
    <Link to={getSurveyURL(survey.surveyId)}>
      <div className={styles.surveyItem}>
        <div className={styles.containerTop}>
          <h5>{survey.title}</h5>
          <div className={styles.containerSubinfo}>
            <span>
              <i className="fa-solid fa-list-check" />
              {formatSurveysType()}
            </span>
            <span>
              {!!isUserDone && (
                <>
                  <i className="fa-regular fa-clock" />
                  <span className={styles.isDone}>пройден</span>
                </>
              )}
              {!isUserDone && (
                <>
                  <i className="fa-regular fa-clock" />
                  <span className={styles.isNoDone}>не пройден</span>
                </>
              )}
            </span>
            {!isUserAuthor && (
            <span onClick={deleteFromVisited}>
              <i className="fa-regular fa-trash-can" />
              <span className={styles.spanDelete}>удалить</span>
            </span>
            )}
            {/* {isUserAuthor && (
            <span onClick={deleteFromMySurveys}>
              <i className="fa-regular fa-trash-can" />
              <span className={styles.spanDelete}>удалить</span>
            </span>
            )} */}
          </div>
        </div>

        <div className={styles.containerBottom}>
          {/* <img src={avatar} alt="avatar" />
          <p>{user.name}</p> */}
        </div>
      </div>
    </Link>
  );
}
