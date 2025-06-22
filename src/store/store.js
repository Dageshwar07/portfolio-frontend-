import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;