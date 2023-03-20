import { useEffect, useState } from 'react';

export function useDebounce(value, ms) {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(value);
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedSearchValue(value);
    }, ms);
    return () => {
      clearTimeout(timeOutID);
    };
  }, [ms, value]);
  return debouncedSearchValue;
}
