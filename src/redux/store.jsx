import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/UserSlice';
import newsReducer from './news/NewsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
  },
});
