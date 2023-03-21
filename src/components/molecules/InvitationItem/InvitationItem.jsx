import { Link } from 'react-router-dom';
import { getSurveyURL } from '../../../utils/helper';
import styles from './invitationItem.module.css';

export function InvitationItem({ invitation }) {
  return (
    <Link to={getSurveyURL(invitation.survey)}>
      <div className={styles.surveyItem}>
        Пользователь
        {' '}
        {invitation.fromUser}
        {' '}
        приглашает Вас пройти опрос
        {' '}
        {invitation.survey}
      </div>
    </Link>
  );
}
