import { createAsyncThunk } from '@reduxjs/toolkit';

import users from './users.json';

export const logInThunk = createAsyncThunk(
  'user/logInThunk',
  async ({ login, password }, {rejectWithValue}) => {
    try {
      const user = users.find((item) => (item.login === login && item.password === password));

      if (!user) throw new Error('incorrect login or password')
      return {
        userID: user.userID,
        userName: user.userName,
        role: user.role,
        authorized: true,
      }
    } catch (error) {
      return rejectWithValue(error.message);
    };
  }
);
