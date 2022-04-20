import { useEffect, useState, useMemo } from 'react';

import { useGetParams } from './useGetParams';
import { GET_PARAMS } from '../RoutesConfig';

export const useGetPopupState = () => {
  const popupName = useGetParams(GET_PARAMS.popup);
  const [mountedPopup, setMountedPopup] = useState(popupName);

  useEffect(() => {
    let timeout;

    if (popupName) {
      timeout && clearTimeout(timeout);
      setMountedPopup(popupName);
    } else {
      timeout = setTimeout(() => {
        setMountedPopup(null);
        clearTimeout(timeout);
      }, 300);
    }
  }, [popupName]);

  const isOpened = useMemo(() => Boolean(popupName), [popupName]);

  return { mountedPopup, isOpened };
};
