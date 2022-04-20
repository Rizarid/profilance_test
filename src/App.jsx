import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { MainPage } from './pages/main/MainPage';
import { NewsPage } from './pages/news/NewsPage';

import './styles/App.sass';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="news" element={<NewsPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
