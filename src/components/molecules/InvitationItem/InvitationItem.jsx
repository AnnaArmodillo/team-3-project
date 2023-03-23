/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import { getSurveyURL } from '../../../utils/helper';
import styles from './invitationItem.module.css';

export function InvitationItem({ invitation }) {
  const accessToken = useSelector(getAccessTokenSelector);
  const client = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => teamProjectApi.deleteInvitation(invitation, accessToken),
    onSuccess: () => { client.invalidateQueries({ queryKey: ['UserFetch'] }); },
  });

  const deleteFromVisited = (e) => {
    e.preventDefault();
    mutateAsync();
    toast.success('Приглашение удалено!');
  };

  return (
    <Link to={getSurveyURL(invitation.survey)}>
      <div className={styles.surveyItem}>
        <div className={styles.containerSubinfo}>
          <span>
            Пользователь
            {' '}
            {invitation.fromUser}
            {' '}
            приглашает Вас пройти опрос
            {' '}
            {invitation.survey}
          </span>
          <span onClick={deleteFromVisited}>
            <i className="fa-regular fa-trash-can" />
            <span className={styles.spanDelete}>удалить</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
