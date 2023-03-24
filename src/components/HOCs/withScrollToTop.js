import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line func-names
export const withScrollToTop = (WrappedComponent) => function () {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <WrappedComponent />
  );
};
