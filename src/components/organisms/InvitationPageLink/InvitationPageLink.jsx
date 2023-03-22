import { Link } from 'react-router-dom';
import { isAuthor } from '../../../utils/helper';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';

export function InvitationPageLink({ author, id }) {
  if (isAuthor(author, id)) {
    return (
      <Link to="/invitation">
        <ButtonPurple>
          Пригласить других пользователей пройти этот опрос
        </ButtonPurple>
      </Link>
    );
  }
}
