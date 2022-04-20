/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import users from './users.json';

const initialState = {
  data: {
    userID: null,
    userName: null,
    role: 'guest',
    authorized: false,
  },
  status: null,
  error: null,
};

export const logInThunk = createAsyncThunk(
  'user/logInThunk',
  async ({ login, password, closePopup }, { rejectWithValue }) => {
    try {
      const user = users.find((item) => (item.userName === login && item.password === password));

      if (!user) throw new Error('incorrect login or password');

      closePopup();

      return {
        userID: user.userID,
        userName: user.userName,
        role: user.role,
        authorized: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.data = {
        userID: null,
        userName: null,
        role: 'guest',
        authorized: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.data = action.payload;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action;
      });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
