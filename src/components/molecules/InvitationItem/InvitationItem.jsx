/* eslint-disable import/no-extraneous-dependencies */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import { getSurveyURL } from '../../../utils/helper';
import styles from './invitationItem.module.css';

export function InvitationItem({ invitation }) {
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessTokenSelector);
  const client = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => teamProjectApi.deleteInvitation(invitation, accessToken),
    onSuccess: () => { client.invalidateQueries({ queryKey: ['UserFetch'] }); },
  });

  const deleteFromVisited = (e) => {
    e.preventDefault();
    mutateAsync();
    toast.success('Приглашение удалено!', {
      autoClose: 2000,
      transition: Slide,
      className: `${styles.toast}`,
      bodyClassName: `${styles.toastBody}`,
      hideProgressBar: true,
      theme: 'colored',
      closeButton: false,
      rtl: false,
    });
  };

  return (
    <Link to={getSurveyURL(invitation.survey)} state={{ from: pathname }}>
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
