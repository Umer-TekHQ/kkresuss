import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tradeReducer from './slices/tradeSlice';
import selectedAssetReducer from './slices/selectedAssetSlice'
import noteReducer from './slices/noteSlice';
import amountReducer from './slices/amountSlice';
import recipientReducer from './slices/recipientSlice'
import securityReducer from './slices/securitySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trade: tradeReducer,
    selectedAsset: selectedAssetReducer,
    note: noteReducer,
    amount: amountReducer,
    recipient: recipientReducer,
    security: securityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;