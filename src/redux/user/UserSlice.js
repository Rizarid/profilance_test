/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import users from './users.json';

const initializationState = {
  data: {
    userID: null,
    userName: null,
    role: null,
    authorized: false,
  },
  status: null,
  error: null,
};

export const logInThunk = createAsyncThunk(
  'user/logInThunk',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const user = users.find((item) => (item.login === login && item.password === password));

      if (!user) throw new Error('incorrect login or password');
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
  initializationState,
  reducers: {
    logOut: (state) => {
      state = initializationState;
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
        state.data = action;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action;
      });
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
