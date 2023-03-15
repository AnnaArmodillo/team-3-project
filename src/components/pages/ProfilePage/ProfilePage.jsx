import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import styles from './profile.module.css';

function ProfileInner({ data }) {
  const {
    name, email, id,
  } = data;

  return (
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
      <p>
        <b>Id:</b>
        {' '}
        {id}
      </p>
    </div>
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
    queryKey: ['UserFetch', userId],
    queryFn: () => teamProjectApi.getUserById(userId),
  });
  console.log({ data });

  useEffect(() => {
    console.log('UserPage', { userId });
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
