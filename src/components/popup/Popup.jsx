import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../button/Button';
import close from '../../static/images/cancel.png';

import './Popup.sass';

export const Popup = (props) => {
  const { isOpened, children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const closeButtonClickHandle = useCallback(() => {
    navigate(pathname);
  }, [navigate, pathname]);

  return (
    <div className={`popup ${!isOpened ? 'popup_closed' : ''}`}>
      <div className="popup__content">
        <div className="popup__close-button">
          <Button
            type="button"
            contentType="image"
            onClick={closeButtonClickHandle}
            image={close}
            alt="Закрыть"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
