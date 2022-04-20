import React from 'react';

import { GET_POPUP } from '../../RoutesConfig';
import { useGetPopupState } from '../../hooks/useGetPopupState';
import { Popup } from '../popup/Popup';

export const PopupsFactory = () => {
  const { mountedPopup, isOpened } = useGetPopupState();
  const Component = GET_POPUP[mountedPopup];

  if (!Component) return null;

  return (
    <Popup isOpened={isOpened} onClose>
      <Component />
    </Popup>
  );
};
