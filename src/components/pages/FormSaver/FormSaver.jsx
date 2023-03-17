import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useDebouncedCallback } from 'use-debounce';

export function FormSaver({
  name, imageContent, imageLinkValues, setImageContent, setImageLinkValues,
}) {
  const { values, setValues } = useFormikContext();
  const prefValuesRef = useRef();
  // console.log(imageContent);
  // console.log(imageLinkValues);

  const preparedValues = {
    values,
    imageLinkValues,
    imageContent,
  };
  const onSave = () => {
    window.localStorage.setItem(name, JSON.stringify(preparedValues));
  };

  const debouncedOnSave = useDebouncedCallback(onSave, 1000);

  useEffect(() => {
    const savedForm = window.localStorage.getItem(name);

    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      prefValuesRef.current = parsedForm;
      setValues(parsedForm.values);
      setImageContent(parsedForm.imageContent);
      setImageLinkValues(parsedForm.imageLinkValues);
    }
  }, [name, setValues, setImageContent, setImageLinkValues]);

  useEffect(() => {
    if (!isEqual(prefValuesRef.current, preparedValues)) {
      debouncedOnSave(preparedValues);
    }
  });

  useEffect(() => {
    prefValuesRef.current = preparedValues;
  });

  return null;
}
