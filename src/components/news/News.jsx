import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNewsThunk } from '../../redux/news/NewsSlice';
import { NewsCard } from '../news-card/NewsCard';
import { useFilter } from '../../hooks/useFilter';

import './News.sass';

export const News = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const role = useSelector((state) => state.user.data.role);
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(getNewsThunk({ role }));
  }, [role, dispatch]);

  const filteredNews = useFilter(searchValue, news, ['title', 'text']);

  const searchFieldChange = (event) => { setSearchValue(event.target.value); };

  return (
    <div className="news">
      <input type="text" onChange={searchFieldChange} className="news__search-field" placeholder="Найти..." />
      <div className="news__list">
        {filteredNews && filteredNews.map((item) => (
          <li key={item.newsId} className="news__item">
            <NewsCard
              newsId={item.newsId}
              title={item.title}
              text={item.text}
              date={item.date}
              confirmed={item.confirmed}
              isAdmin={role === 'admin'}
            />
          </li>
        ))}
      </div>
    </div>
  );
};
