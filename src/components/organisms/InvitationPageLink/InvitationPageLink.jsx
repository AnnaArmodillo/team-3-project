import { Link, useLocation } from 'react-router-dom';
import { isAuthor } from '../../../utils/helper';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';

export function InvitationPageLink({ author, id }) {
  const { pathname } = useLocation();
  if (isAuthor(author, id)) {
    return (
      <Link to="/invitation" state={{ from: pathname }}>
        <ButtonPurple>
          Пригласить других пользователей пройти этот опрос
        </ButtonPurple>
      </Link>
    );
  }
}
