import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addNewsThunk } from '../../redux/news/NewsSlice';
import { Button } from '../button/Button';

import './AddingNewsForm.sass';

export const AddingNewsForm = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { title, text } = data;
    dispatch(addNewsThunk({ title, text }));
    reset();
  };

  return (
    <form className="adding-news-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="adding-news-form__label">
        Заголовок
        <input {...register('title', { required: true })} />
      </label>
      <label className="adding-news-form__label">
        Текст
        <textarea {...register('text', { required: true })} />
      </label>
      <Button text="Добавить новость" type="submit" />
    </form>
  );
};
