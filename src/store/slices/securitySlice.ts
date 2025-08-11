import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecurityState {
  ticks: { [key: string]: boolean };
}

const initialState: SecurityState = {
  ticks: {},
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setTicks(state, action: PayloadAction<{ [key: string]: boolean }>) {
      state.ticks = action.payload;
    },
    toggleTick(state, action: PayloadAction<string>) {
      const title = action.payload;
      state.ticks[title] = !state.ticks[title];
    },
  },
});

export const { setTicks, toggleTick } = securitySlice.actions;
export default securitySlice.reducer;
