import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import ownerSlice from './slices/ownerSlice';
import helpSlice from './slices/helpSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    owner: ownerSlice,
    help: helpSlice,
  },
});
