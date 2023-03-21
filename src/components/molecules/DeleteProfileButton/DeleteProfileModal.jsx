import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector, signOut } from '../../../redux/slices/userSlice';
import { Modal } from '../../organisms/Modal/Modal';

export function DeleteProfileModal({
  closeHandler, isOpen,
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessTokenSelector);
  const navigate = useNavigate();

  const {
    mutateAsync: signOutMutation,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.signOut(values),
  });
  const deleteProfileHandler = async () => {
    await signOutMutation(accessToken);
    dispatch(signOut());
    navigate('/');
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Вы действительно хотите удалить пользователя?
      </h4>
      <div className="d-flex justify-content-center">
        <button
          onClick={deleteProfileHandler}
          type="button"
          className="btn mx-2 btn-danger"
        >
          Удалить
        </button>
        <button
          onClick={closeHandler}
          type="button"
          className="btn mx-2 btn-dark"
        >
          Отменить
        </button>
      </div>
    </Modal>
  );
}
