import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AddingNewsForm } from '../../components/adding-news-form/AddingNewsForm';
import { News } from '../../components/news/News';

import './NewsPage.sass';

const MemoAddingNewsForm = memo(AddingNewsForm);
const MemoNews = memo(News);

export const NewsPage = () => {
  document.title = 'Новости';
  const role = useSelector((state) => state.user.data.role);

  return (
    <main className="news-page">
      <h1 className="news-page__title">Новости</h1>
      <div className="news-page__news">
        {role === 'user' && <MemoAddingNewsForm />}
        <MemoNews />
      </div>
    </main>
  );
};
