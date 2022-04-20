import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { logInThunk } from '../../redux/user/UserSlice';

import './SignIn.sass';
import { Button } from '../button/Button';

const MemoButton = memo(Button);

export const SignIn = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.user);

  const closePopup = () => {
    navigate(pathname);
  };

  const onSubmit = (data) => {
    const { login, password } = data;
    dispatch(logInThunk({ login, password, closePopup }));
  };

  return (
    <form className="sign-in" onSubmit={handleSubmit(onSubmit)}>
      <label className="sign-in__label">
        Логин
        <input {...register('login')} />
      </label>

      <label className="sign-in__label">
        Пароль
        <input type="password" {...register('password')} />
      </label>

      {error && <div className="sign-in__error">Неверный логин или пароль</div>}

      <MemoButton type="submit" contentType="text" text="Войти" />
    </form>
  );
};
