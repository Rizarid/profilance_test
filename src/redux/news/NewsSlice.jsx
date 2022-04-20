/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import news from './news.json';

const initialState = {
  news: [],
  status: '',
  error: '',
};

export const getNewsThunk = createAsyncThunk(
  'news/getNewsThunk',
  async ({ role }, { rejectWithValue }) => {
    try {
      const filteredNews = news.filter((item) => (
        (role === 'guest') ? item.confirmed : true
      ));

      filteredNews.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });

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
  'news/deleteNewsThunk',
  async ({ newsId }, { rejectWithValue, dispatch }) => {
    try {
      const index = news.findIndex((item) => (item.newsId === newsId));
      news.splice(index, 1);

      dispatch(deleteNews(newsId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const confirmNewsThunk = createAsyncThunk(
  'news/confirmNewsThunk',
  async ({ newsId }, { rejectWithValue, dispatch }) => {
    try {
      const index = news.findIndex((item) => (item.newsId === newsId));
      news[index].confirmed = true;

      dispatch(confirmNews(index));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewsThunk = createAsyncThunk(
  'news/addNewsThunk',
  async ({ title, text }, { rejectWithValue, dispatch }) => {
    try {
      const newNews = {
        newsId: (news.length + 2).toString(),
        title,
        text,
        date: Date.now(),
        confirmed: false,
      };

      news.unshift(newNews);
      dispatch(addNews(newNews));
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
      const index = state.news.findIndex((item) => (item.newsId === action.payload));
      state.news.splice(index, 1);
    },
    addNews: (state, action) => {
      state.news.unshift(action.payload);
    },
    confirmNews: (state, action) => {
      state.news[action.payload].confirmed = true;
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
      .addCase(getNewsThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(deleteNewsThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addNewsThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { deleteNews, addNews, confirmNews } = newsSlice.actions;

export default newsSlice.reducer;
