import React from 'react';
import { useSelector } from 'react-redux';

import './MainPage.sass';

export const MainPage = () => {
  document.title = 'Главная';
  const { userName, authorized } = useSelector((state) => state.user.data);

  return (
    <main className="main-page">
      <h1 className="main-page__title">{`Привет, ${authorized ? userName : 'Гость'}`}</h1>
    </main>
  );
};
