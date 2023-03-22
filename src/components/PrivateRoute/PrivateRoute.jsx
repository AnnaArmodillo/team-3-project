/* eslint-disable consistent-return */
import { useMutation } from '@tanstack/react-query';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../api/TeamProjectApi';
import {
  getAccessTokenSelector, getRefreshTokenSelector, getUserSelector, refreshTokens, signOut,
} from '../../redux/slices/userSlice';

export const PrivateRoute = ({ children }) => {
  const accessToken = useSelector(getAccessTokenSelector);
  const refreshToken = useSelector(getRefreshTokenSelector);
  const { id: userId } = useSelector(getUserSelector);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutateAsync,
    isError,
    error,
    isLoading,
    reset,
  } = useMutation({
    mutationFn: (values) => {
      const { token } = values;
      const mutationValues = {
        userId: values.userId,
        userToken: values.refreshToken,
      };
      return teamProjectApi.refreshToken(mutationValues, token).then();
    },
  });

  if (isError) {
    console.log('Произошла ошибка при обновлении токенов', error);
    dispatch(signOut());
    return navigate('/signin', {
      state: {
        from: pathname,
      },
    });
  }

  useEffect(() => {
    let timeoutId;
    const mutationValues = {
      userId,
      refreshToken,
      token: accessToken,
    };

    const noAuth = () => {
      dispatch(signOut());
      return navigate('/signin', {
        state: {
          from: pathname,
        },
      });
    };

    const func = async () => {
      if (accessToken && refreshToken) {
        let { exp: expAccess } = jwtDecode(accessToken);
        let { exp: expRefresh } = jwtDecode(refreshToken);

        expAccess *= 1e3;
        expRefresh *= 1e3;

        const now = Date.now();

        if (expAccess > now && expRefresh > now) {
          timeoutId = window.setTimeout(async () => {
            const data = await mutateAsync(mutationValues);
            if (data) {
              return dispatch(refreshTokens(data));
            }
            return noAuth();
          }, Math.max(expAccess - now, 0));

          return;
        }

        if (expAccess < now && expRefresh > now) {
          if (timeoutId) window.clearTimeout(timeoutId);
          const data = await mutateAsync(mutationValues);
          if (data) {
            return dispatch(refreshTokens(data));
          }
          return noAuth();
        }
      }
      return noAuth();
    };

    func();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (isLoading) reset();
    };
  }, [
    accessToken,
    dispatch,
    navigate,
    pathname,
    refreshToken,
    mutateAsync,
  ]);

  return children;
};
