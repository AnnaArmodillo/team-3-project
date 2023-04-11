import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import {
  getAccessTokenSelector,
  getUserSelector,
} from '../../../redux/slices/userSlice';
import { getQueryKeyPhoto, getQueryKeyUser } from '../../../utils/constants';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { withQuery } from '../../HOCs/withQuery';
import { DeleteProfileButton } from '../../molecules/DeleteProfileButton/DeleteProfileButton';
import { InvitationItem } from '../../molecules/InvitationItem/InvitationItem';
import { LinkToCreatingForm } from '../../molecules/LinkToCreatingForm/LinkToCreatingForm';
import { SignOutButton } from '../../molecules/SignOutButton/SignOutButton';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './profile.module.css';
import { EditUserNameButton } from '../../molecules/EditUserNameButton/EditUserNameButton';
import avatar from '../../../images/avatar.png';
import { ChangePasswordButton } from '../../molecules/ChangePasswordButton/ChangePasswordButton';
import { ChangePhotoButton } from '../../molecules/ChangePhotoButton/ChangePhotoButton';
import { Loader } from '../../Loader/Loader';

function ProfileInner({ data }) {
  console.log('render');
  const { pathname } = useLocation();
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const accessToken = useSelector(getAccessTokenSelector);
  const {
    name, email, login, invitations, photo,
  } = data;
  function checkIsImageUploaded() {
    if (photo.startsWith('data') || photo.startsWith('http') || !photo) {
      return false;
    }
    return true;
  }
  const { isError, error, isLoading } = useQuery({
    queryKey: getQueryKeyPhoto(),
    queryFn: () => teamProjectApi
      .getUploadedFile(photo, accessToken)
      .then((res) => res.blob())
      .then((result) => {
        setUrl(window.URL.createObjectURL(result));
        return result;
      }),
    enabled: checkIsImageUploaded(),
  });
  useEffect(() => {
    if (!checkIsImageUploaded()) {
      setUrl('');
    }
    queryClient.invalidateQueries({ queryKey: getQueryKeyPhoto() });
  }, [photo]);
  return (
    <MainWrap>
      <div className={styles.profilePage}>
        <h1>Пользователь</h1>
        <div className={styles.card}>
          <div className={styles.photoWrapper}>
            <div className={styles.photo}>
              {isLoading && checkIsImageUploaded() && <Loader />}
              {isError && <div className={styles.message}>{error.message}</div>}
              <img
                src={url || photo || avatar}
                alt="фото профиля"
              />
            </div>
            <ChangePhotoButton />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.nameWrapper}>
              <div>
                <b>Имя:</b>
                {' '}
                {name}
              </div>
              <EditUserNameButton />
            </div>
            <div>
              <b>Email:</b>
              {' '}
              {email}
            </div>
            <div>
              <b>Логин:</b>
              {' '}
              {login}
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <LinkToCreatingForm />
        </div>
        <div className={styles.button}>
          <Link
            to="/mysurveys"
            state={{ from: pathname }}
          >
            <ButtonPurple type="button">Мои опросы</ButtonPurple>
          </Link>
          {' '}
          <Link
            to="/visited"
            state={{ from: pathname }}
          >
            <ButtonPurple type="button">Посещенные опросы</ButtonPurple>
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
        <div className={styles.buttonsWrapper}>
          <div className={styles.button}>
            <SignOutButton />
          </div>
          <div className={styles.button}>
            <ChangePasswordButton />
          </div>
          <div className={styles.button}>
            <DeleteProfileButton />
          </div>
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

  return (
    userId && (
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
