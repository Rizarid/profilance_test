import React from 'react';
import { Outlet } from 'react-router';

import { Header } from '../header/Header';
import { PopupsFactory } from '../popups-factory/PopupsFactory';

import './Layout.sass';

export const Layout = () => (
  <>
    <PopupsFactory />
    <Header />
    <div className="content">
      <Outlet />
    </div>
  </>
);
