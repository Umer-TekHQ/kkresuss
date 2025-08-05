import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../../screens/Trade/types';

interface TradeState {
  token1: Token | null;
  token2: Token | null;
  amount1: string;
  amount2: string;
  isUSD: boolean;
}

const initialState: TradeState = {
  token1: null,
  token2: null,
  amount1: '',
  amount2: '',
  isUSD: false,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setToken1: (state, action: PayloadAction<Token>) => {
      state.token1 = action.payload;
    },
    setToken2: (state, action: PayloadAction<Token>) => {
      state.token2 = action.payload;
    },
    setAmount1: (state, action: PayloadAction<string>) => {
      state.amount1 = action.payload;
    },
    setAmount2: (state, action: PayloadAction<string>) => {
      state.amount2 = action.payload;
    },
    toggleUSD: (state) => {
      state.isUSD = !state.isUSD;
    },
    resetTrade: (state) => {
      state.token1 = null;
      state.token2 = null;
      state.amount1 = '';
      state.amount2 = '';
    },
  },
});

export const { setToken1, setToken2, setAmount1, setAmount2, toggleUSD, resetTrade } = tradeSlice.actions;

export default tradeSlice.reducer;