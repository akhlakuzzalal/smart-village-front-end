import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import donationSlice from './slices/Donations/donationSlice';
import { marketAllReducers } from './slices/eMarket/marketAllReducers';
import eventReducer from './slices/event/eventSlice';
import notificationReducer from './slices/notification/notificationSlice';
import PayModalSlice from './slices/payModal/PayModalSlice';
import reviewReducer from './slices/review/reviewSlice';
import userReducer from './slices/user/userSlice';

const reducers = combineReducers({
  reviews: reviewReducer,
  notifications: notificationReducer,
  user: userReducer,
  market: marketAllReducers,
  pay: PayModalSlice,
  events: eventReducer,
  donation: donationSlice,
});

const persistConfig = {
  key: 'digital_village_storage',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
