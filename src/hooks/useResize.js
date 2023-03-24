import { useEffect, useState } from 'react';
import {
  SCREEN_LG, SCREEN_MD, SCREEN_SM, SCREEN_XL, SCREEN_XXL,
} from '../utils/constants';

export const useResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWindowWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    windowWidth,
    isScreenSm: windowWidth >= SCREEN_SM,
    isScreenMd: windowWidth >= SCREEN_MD,
    isScreenLg: windowWidth >= SCREEN_LG,
    isScreenXl: windowWidth >= SCREEN_XL,
    isScreenXxl: windowWidth >= SCREEN_XXL,
  };
};
