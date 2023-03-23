import { AccordionItem } from '../../molecules/AccordionItem/AccordionItem';
import { Title } from '../../molecules/Title/Title';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './doc.module.css';
import createSurveyVideo from '../../../video/createSurvey.mp4';
import allSurveysVideo from '../../../video/allSurveys.mp4';

export function Doc() {
  const accordionData = [
    {
      title: 'Cтраница создания опроса',
      content: {
        description: (
          <>
            <p>Здесь вы сможете создать опрос и поделиться им с участниками</p>
            <ol>
              <li>Введите название опроса. Это обязательное поле</li>
              <li>Укажите тип опроса.</li>
              <li>
                Заполните интересующие варианты ответов. При необходимоти вы
                можете добавлять новые варианты, но обязательно должен быть минимум один вариант
              </li>
              <li>Сформируйте ссылку на ваш опрос. Готово!</li>
            </ol>
          </>
        ),
        video: createSurveyVideo,
      },
    },
    {
      title: 'Cтраница всех опросов',
      content: {
        description: (
          <>
            <p>Здесь отображаются все опросы, которые были созданы всеми пользователями</p>
            <p>Если вы хотите найти определенный опрос, воспользуйтесь поиском или фильтрами</p>
          </>
        ),
        video: allSurveysVideo,
      },
    },
  ];
  return (
    <MainWrap>
      <article className={styles.containerWrapped}>
        <Title title="Основной функционал приложения" />
        <section className={styles.containerList}>
          {accordionData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <AccordionItem key={index} accordionItem={item} />
          ))}
        </section>
      </article>
    </MainWrap>
  );
}
