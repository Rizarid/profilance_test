/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { news } from './news.json';

const initialState = {
  news: [],
  status: '',
  error: '',
};

export const getNewsThunk = createAsyncThunk(
  'news/getNewsThunk',
  async (role, { rejectWithValue }) => {
    try {
      const filteredNews = news.filter((item) => (
        (role === 'user') ? item.confirmed : true
      ));

      return filteredNews.map((item) => ({
        newsId: item.newsId,
        title: item.title,
        text: item.text,
        date: item.date,
        confirmed: item.confirmed,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteNewsThunk = createAsyncThunk(
  'news/getNewsThunk',
  async (newsId, { rejectWithValue, dispatch }) => {
    try {
      const index = news.findIndex((item) => (item.newsId === newsId));
      news.slice(index, 1);

      dispatch(deleteNews(newsId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewsThunk = createAsyncThunk(
  'news/getNewsThunk',
  async ({ title, text }, { rejectWithValue }) => {
    try {
      news.push({
        newsId: (this.news.length + 1).toString(),
        title,
        text,
        date: Date.now(),
        confirmed: false,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    deleteNews: (state, action) => {
      state.news = state.news.filter((item) => action.payload !== item.newsId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNewsThunk.fulfilled, (state, action) => {
        state.news = action.payload;
        state.error = null;
      })
      .addCase(getNewsThunk.fulfilled, (state, action) => {
        state.news = action.payload;
        state.error = null;
      })
      .addCase(deleteNewsThunk.fulfilled, (state, action) => {
        state.news = action.payload;
        state.error = null;
      })
      .addCase(addNewsThunk.fulfilled, (state, action) => {
        state.news = action.payload;
        state.error = null;
      });
  },
});

export const { deleteNews } = newsSlice.actions;

export default newsSlice.reducer;
