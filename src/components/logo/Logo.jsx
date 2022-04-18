import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

export const Logo = () => (
  <Link to="/">
    <img src={logo} alt="logo" className="logo" />
  </Link>
);
