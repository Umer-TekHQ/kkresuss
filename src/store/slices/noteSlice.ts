import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteState {
  note: string;
}

const initialState: NoteState = {
  note: '',
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
  },
});

export const { setNote } = noteSlice.actions;
export default noteSlice.reducer;