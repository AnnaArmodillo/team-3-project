import { Title } from '../../molecules/Title/Title';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './doc.module.css';

export function Doc() {
  return (
    <MainWrap>
      <article className={styles.containerWrapped}>
        <Title title="Основной функционал приложения" />
        <section className={styles.containerList}>
          <div>
            <h4>Cтраница создания опроса</h4>
            <p>Описание</p>
          </div>
          <div>
            <h4>Cтраница ваших личных данных</h4>
            <p>Описание</p>
          </div>
          <div>
            <h4>Cтраница ваших опросов</h4>
            <p>Описание</p>
          </div>
          <div>
            <h4>Cтраница посещенных опросов</h4>
            <p>Описание</p>
          </div>
          <div>
            <h4>Cтраница опроса в трех вариациях</h4>
            <p>Описание</p>
          </div>
        </section>
      </article>
    </MainWrap>
  );
}
