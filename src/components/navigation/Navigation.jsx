import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../button/Button';
import { logOut } from '../../redux/user/UserSlice';
import burger from '../../static/images/burger.png';
import close from '../../static/images/cancel.png';

import './Navigation.sass';

const MemoButton = memo(Button);
const MemoLink = memo(Link);

export const Navigation = () => {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.user.data.authorized);
  const { pathname } = useLocation();

  const [showedBurgerMenu, setShowedBurgerMenu] = useState(false);

  const logOutClick = useCallback((event) => {
    event.preventDefault();
    dispatch(logOut());
  }, [dispatch]);

  const switchBurgerMenu = useCallback(() => {
    setShowedBurgerMenu(!showedBurgerMenu);
  }, [setShowedBurgerMenu, showedBurgerMenu]);

  return (
    <div className="navigation">
      <div className="navigation__burger">
        <MemoButton
          type="button"
          contentType="image"
          image={!showedBurgerMenu ? burger : close}
          alt="Бургер меню"
          onClick={switchBurgerMenu}
        />
      </div>
      <nav className={`navigation__list ${showedBurgerMenu ? 'navigation__list_showed' : ''}`}>
        <MemoLink to="/news" className="navigation__link">новости</MemoLink>

        {authorized ? (
          <Link to={pathname} onClick={logOutClick} className="navigation__link">выход</Link>
        ) : (
          <Link to={`${pathname}?popup=sign-in`} className="navigation__link">вход</Link>
        )}
      </nav>
    </div>
  );
};
