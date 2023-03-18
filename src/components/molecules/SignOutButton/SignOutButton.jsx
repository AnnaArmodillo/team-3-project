import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, signOut } from '../../../redux/slices/userSlice';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';

export function SignOutButton() {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessTokenSelector);

  const {
    mutateAsync: signOutMutation,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.signOut(values),
  });
  const signOutHandler = async () => {
    await signOutMutation(accessToken);
    dispatch(signOut());
  };

  return (
    <ButtonWhite
      type="button"
      onClick={signOutHandler}
    >
      Выйти
    </ButtonWhite>
  );
}
