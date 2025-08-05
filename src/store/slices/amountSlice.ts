import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AmountState {
  amount: string;
}

const initialState: AmountState = {
  amount: '',
};

const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = amountSlice.actions;
export default amountSlice.reducer;