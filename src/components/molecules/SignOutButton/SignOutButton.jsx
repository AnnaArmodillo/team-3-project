import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, signOut } from '../../../redux/slices/userSlice';
import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';

export function SignOutButton() {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessTokenSelector);
  const navigate = useNavigate();

  const {
    mutateAsync: signOutMutation,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.signOut(values),
  });
  const signOutHandler = async () => {
    await signOutMutation(accessToken);
    dispatch(signOut());
    navigate('/');
  };

  return (
    <ButtonGrey
      type="button"
      onClick={signOutHandler}
    >
      Выйти
    </ButtonGrey>
  );
}
