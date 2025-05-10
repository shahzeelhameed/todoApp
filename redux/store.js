import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter_slice';

const store = configureStore({
  reducer: counterReducer, //set your reducer here
});

export default store;
