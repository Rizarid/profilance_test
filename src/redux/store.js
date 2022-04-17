import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/UserSlice';
import newsReducer from './news/NewsSlice';

export const store = combineReducers({
  reducer: {
    user: userReducer,
    news: newsReducer,
  },
});
