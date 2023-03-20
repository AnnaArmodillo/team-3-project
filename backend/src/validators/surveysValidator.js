import * as Yup from 'yup';

export const surveysValidationSchema = Yup.object().shape({
  surveyTitle: Yup.string()
    .min(2, 'Заголовок должен состоять минимум из двух символов')
    .max(100, 'Заголовок должен содержать не более 100 символов')
    .required('Заголовок опроса является обязательным полем'),
  surveyType: Yup.string()
    .oneOf(['SC', 'MC', 'UC'])
    .required('Тип опроса является обязательным полем'),
  options: Yup.array()
    .min(1, 'Необходим хотя бы один вариант ответа')
    .of(
      Yup.object().shape({
        optionTitle: Yup.string().required(
          'Заголовок ответа является обязательным полем'
        ),
        link: Yup.string().url(
          'Необходимо указать корректную ссылку на изображение'
        ),
      })
    ),
});
