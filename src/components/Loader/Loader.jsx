import loader from '../../images/loader.gif';
import LoaderStyles from './Loader.module.css';

export function Loader() {
  return (
    <div className={LoaderStyles.loader}>
      <img src={loader} alt="Идет загрузка..." />
      <p>Идет загрузка, пожалуйста, подождите</p>
    </div>
  );
}
