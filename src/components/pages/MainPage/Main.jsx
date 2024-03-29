// import { Link } from 'react-router-dom';
// import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { LinkToCreatingForm } from '../../molecules/LinkToCreatingForm/LinkToCreatingForm';
import styles from './main.module.css';
import surveyLayout from './survey_main.gif';

export function Main() {
  return (
    <main>
      <section className={styles.containerHome}>
        <div className={styles.containerLeft}>
          <h1>Создайте опрос в один клик</h1>
          <div className={styles.button}>
            <LinkToCreatingForm />
          </div>
        </div>
        <div className={styles.containerRight}>
          <img src={surveyLayout} alt="пример опроса" />
        </div>
      </section>
    </main>
  );
}
