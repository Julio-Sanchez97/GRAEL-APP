import { configureStore } from '@reduxjs/toolkit';
import sessionUserReducer from './sessionUserSlice';
import documentFormReducer from './documentFormSlice';
import dashboardAdminReducer from './dashboardAdminSlice';

const store = configureStore({
  reducer: {
    sessionUser: sessionUserReducer,
    documentForm: documentFormReducer,
    dashboardAdmin: dashboardAdminReducer,
  },
});

export default store;
