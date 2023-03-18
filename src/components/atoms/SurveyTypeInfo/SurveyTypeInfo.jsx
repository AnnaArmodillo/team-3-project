import { MC, SC, UC } from '../../../utils/constants';
import styles from './surveyTypeInfo.module.css';

export function SurveyTypeInfo({ surveyType }) {
  switch (surveyType) {
    case MC:
      return (
        <div className={styles.surveyTypeInfo}>
          Здесь можно выбрать несколько вариантов ответа
        </div>
      );
    case SC:
      return (
        <div className={styles.surveyTypeInfo}>
          Здесь можно выбрать только один вариант ответа
        </div>
      );
    case UC:
      return (
        <div className={styles.surveyTypeInfo}>
          Здесь можно выбрать только один вариант ответа, если его никто не выбрал до Вас.
        </div>
      );
    default:
      return null;
  }
}
