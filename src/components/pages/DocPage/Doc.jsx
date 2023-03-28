import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import classNames from 'classnames';
import { Title } from '../../molecules/Title/Title';
import { MainWrap } from '../../templates/MainWrap/MainWrap';
import styles from './doc.module.css';
import createSurveyVideo from '../../../video/createSurvey.mp4';
import allSurveysVideo from '../../../video/allSurveys.mp4';
import { AccordionItem } from '../../molecules/AccordionItem/AccordionItem';

export function Doc() {
  const tabs = [
    {
      title: 'Cтраница создания опроса',
      content: {
        description: (
          <>
            <p>Здесь Вы сможете создать опрос и поделиться им с участниками.</p>
            <ol>
              <li>Введите название опроса. Это обязательное поле</li>
              <li>
                Укажите тип опроса. Можно выбрать один из типов:
                <ul>
                  <li>
                    Единственный - каждый участник может проголосовать за один
                    вариант ответа
                  </li>
                  <li>
                    Множественный - каждый участник может проголосовать за
                    несколько вариантов ответа
                  </li>
                  <li>
                    Уникальный - каждый участник может проголосовать за один
                    вариант ответа, если за этот ответ никто не голосовал
                  </li>
                </ul>
              </li>
              <li>
                Заполните интересующие варианты ответов. Название ответа
                обязательно. По желанию можно добавить ссылку на сторонний
                ресурс, загрузить картинку или указать ссылку на картинку.
              </li>
              <li>Сформируйте ссылку на Ваш опрос. Готово!</li>
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
            <p>
              Здесь отображаются все опросы, которые были созданы всеми
              пользователями.
            </p>
            <p>
              Если Вы хотите найти определенный опрос, воспользуйтесь поиском
              или фильтрами.
            </p>
          </>
        ),
        video: allSurveysVideo,
      },
    },
    {
      title: 'Cтраница профиля',
      content: {
        description: (
          <>
            <p>На странице профиля отображается Ваша личная информация.</p>
            <p>
              Здесь расположены ссылки для просмотра посещенных Вами опросов и
              тех опросов, которые Вы создали.
            </p>
            <p>
              Также здесь присутствует блок с приглашениями к опросам,
              отправленными Вам другими пользователями.
            </p>
            <p>Со страницы профиля Вы можете удалить свой аккаунт.</p>
          </>
        ),
        video: allSurveysVideo,
      },
    },
    {
      title: 'Cтраница опроса',
      content: {
        description: (
          <>
            <p>
              При переходе на детальную страницу опроса под его заголовком
              показывается информация о том, можно ли выбрать в данном опросе
              один вариант ответа либо несколько, в зависимости от типа опроса.
            </p>
            <p>
              Если автором опроса были добавлены ссылки на сторонние ресурсы для
              просмотра более подробной информации по вариантам ответов, Вы
              можете перейти на эти ресурсы, кликнув «Нажать для просмотра».
            </p>
            <p>
              После выбора вариантов путем клика на карточки Вы можете нажать на
              кнопку «Подтвердить выбор», расположенную в нижней части страницы,
              и Ваш голос будет учтен в данном опросе.
            </p>
            <p>
              Также на странице опроса доступны текущие результаты голосования.
            </p>
          </>
        ),
        video: allSurveysVideo,
      },
    },
    {
      title: 'Cтраница «Мои опросы»',
      content: {
        description: (
          <p>
            На странице «Мои опросы» находятся все опросы, созданные Вами. Также
            в карточке каждого опроса отображается информация о том,
            проголосовали ли Вы уже в этом опросе, или нет.
          </p>
        ),
        video: allSurveysVideo,
      },
    },
    {
      title: 'Cтраница «Посещенные опросы»',
      content: {
        description: (
          <>
            <p>
              На странице посещенных опросов находятся все опросы, на детальные
              страницы которых Вы переходили.
            </p>
            <p>
              Опрос можно удалить из списка посещенных, нажав на кнопку
              «Удалить» в карточке опроса. Кроме этого, в карточке отображается
              информация о том, проголосовали ли Вы уже в этом опросе, или нет.
            </p>
          </>
        ),
        video: allSurveysVideo,
      },
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <MainWrap>
      <article className={styles.containerWrapped}>
        <Title title="Основной функционал приложения" />
        <section className={styles.containerList}>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              {tabs.map((item) => (
                <li
                  key={item.title}
                  className={classNames(styles.li, {
                    [styles.selected]: item.title === selectedTab.title,
                  })}
                  onClick={() => setSelectedTab(item)}
                  role="presentation"
                >
                  {item.title}
                  {item.title === selectedTab.title ? (
                    <motion.div
                      className={styles.underline}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      transition={{
                        type: 'tween',
                        duration: 0.5,
                      }}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <AnimatePresence mode="wait">
            <AccordionItem
              accordionItem={selectedTab}
              key={selectedTab.title}
            />

          </AnimatePresence>
        </section>
      </article>
    </MainWrap>
  );
}
