import { Link } from 'react-router-dom';
import { Title } from '../../molecules/Title/Title';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './contacts.module.css';

export function Contacts() {
  return (
    <MainWrap>
      <article className={styles.containerWrapped}>
        <Title title="Наши контакты" />
        <section>
          <Link to="https://github.com/lev33" target="_blank">
            https://github.com/lev33
          </Link>
          <hr />
          <Link to="https://github.com/DYAlex" target="_blank">
            https://github.com/DYAlex
          </Link>
          <hr />
          <Link to="https://github.com/AnnaArmodillo" target="_blank">
            https://github.com/AnnaArmodillo
          </Link>
          <hr />
          <Link to="https://github.com/KatlinBulycheva" target="_blank">
            https://github.com/KatlinBulycheva
          </Link>
        </section>
      </article>
    </MainWrap>
  );
}
