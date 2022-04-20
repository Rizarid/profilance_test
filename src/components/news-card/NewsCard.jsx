import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmNewsThunk, deleteNewsThunk } from '../../redux/news/NewsSlice';

import { Button } from '../button/Button';
import apply from '../../static/images/check.png';
import cancel from '../../static/images/cross.png';

import './NewsCard.sass';

export const NewsCard = (props) => {
  const {
    newsId, title, text, date, confirmed, isAdmin = false,
  } = props;

  const dispatch = useDispatch();

  const applyClickHandle = () => {
    dispatch(confirmNewsThunk({ newsId }));
  };

  const cancelClickHandle = () => {
    dispatch(deleteNewsThunk({ newsId }));
  };

  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('ru', options);

  return (
    <div className="news-card">
      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__text">{text}</p>
      <p className="news-card__date">{formattedDate}</p>
      {(isAdmin && !confirmed) && (
        <div className="news-card__control-panel">
          <Button contentType="image" image={apply} alt="Одобрить" onClick={applyClickHandle} />
          <Button contentType="image" image={cancel} alt="Удалить" onClick={cancelClickHandle} />
        </div>
      )}
    </div>
  );
};
