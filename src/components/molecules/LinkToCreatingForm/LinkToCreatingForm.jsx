import { Link } from 'react-router-dom';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';

export function LinkToCreatingForm() {
  return (
    <Link to="/creating">
      <ButtonPurple type="button">
        Новый опрос
      </ButtonPurple>
    </Link>
  );
}
