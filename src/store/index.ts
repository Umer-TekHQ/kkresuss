import { configureStore } from '@reduxjs/toolkit';

import amountReducer from './slices/amountSlice';
import appReducer from './slices/appSlice'
import noteReducer from './slices/noteSlice';
import recipientReducer from './slices/recipientSlice'
import securityReducer from './slices/securitySlice';
import selectedAssetReducer from './slices/selectedAssetSlice'
import tradeReducer from './slices/tradeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trade: tradeReducer,
    selectedAsset: selectedAssetReducer,
    note: noteReducer,
    amount: amountReducer,
    recipient: recipientReducer,
    security: securityReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;