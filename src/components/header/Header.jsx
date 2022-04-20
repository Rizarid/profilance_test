import React from 'react';

import { Logo } from '../logo/Logo';
import { Navigation } from '../navigation/Navigation';

import './Header.sass';

export const Header = () => (
  <header className="header">
    <div className="header__container">
      <Logo />
      <Navigation />
    </div>
  </header>
);
