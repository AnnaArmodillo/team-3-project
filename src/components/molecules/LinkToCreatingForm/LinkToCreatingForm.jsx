import { Link, useLocation } from 'react-router-dom';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';

export function LinkToCreatingForm() {
  const { pathname } = useLocation();
  return (
    <Link to="/creating" state={{ from: pathname }}>
      <ButtonPurple type="button">
        Новый опрос
      </ButtonPurple>
    </Link>
  );
}
