import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  hasLoadedHome: boolean;
}

const initialState: AppState = {
  hasLoadedHome: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHasLoadedHome(state, action) {
      state.hasLoadedHome = action.payload;
    },
  },
});

export const { setHasLoadedHome } = appSlice.actions;
export default appSlice.reducer;
