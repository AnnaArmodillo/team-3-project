import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { getQueryKeyUser } from '../../../utils/constants';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { withQuery } from '../../HOCs/withQuery';
import { DeleteProfileButton } from '../../molecules/DeleteProfileButton/DeleteProfileButton';
import { InvitationItem } from '../../molecules/InvitationItem/InvitationItem';
import { LinkToCreatingForm } from '../../molecules/LinkToCreatingForm/LinkToCreatingForm';
import { SignOutButton } from '../../molecules/SignOutButton/SignOutButton';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './profile.module.css';

function ProfileInner({ data }) {
  const {
    name, email, invitations,
  } = data;

  return (
    <MainWrap>
      <div className={styles.profilePage}>
        <h1>Пользователь</h1>
        <p>
          <b>Имя:</b>
          {' '}
          {name}
        </p>
        <p>
          <b>Email:</b>
          {' '}
          {email}
        </p>
        <div className={styles.button}>
          <LinkToCreatingForm />
        </div>
        <div className={styles.button}>
          <Link to="/mysurveys">
            <ButtonPurple type="button">
              Мои опросы
            </ButtonPurple>
          </Link>
          {' '}
          <Link to="/visited">
            <ButtonPurple type="button">
              Посещенные опросы
            </ButtonPurple>
          </Link>
        </div>
        {!!invitations.length && (
          <div className={styles.listSurveys}>
            {invitations.map((invitation) => (
              <InvitationItem
                key={invitation.survey + invitation.fromUser}
                invitation={invitation}
              />
            ))}
          </div>
        )}
        <div className={styles.button}>
          <SignOutButton />
        </div>
        <div className={styles.button}>
          <DeleteProfileButton />
        </div>
      </div>
    </MainWrap>
  );
}

const ProfileInnerWithQuery = withQuery(ProfileInner);

export function Profile() {
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const userId = user.id;

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQueryKeyUser(userId),
    queryFn: () => teamProjectApi.getUserById(userId),
  });

  useEffect(() => {
    if (!userId) navigate('/signin');
  }, [userId]);

  return (userId
    && (
      <ProfileInnerWithQuery
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    )
  );
}
