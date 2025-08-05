import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

interface RecipientState {
  rname: string;
  subtext: string;
  logo: ImageSourcePropType | null;
}

const initialState: RecipientState = {
  rname: '',
  subtext: '',
  logo: null,
};

const recipientSlice = createSlice({
  name: 'recipient',
  initialState,
  reducers: {
    setRecipient: (
      state,
      action: PayloadAction<{
        rname: string;
        subtext: string;
        logo: ImageSourcePropType | null;
      }>
    ) => {
      state.rname = action.payload.rname;
      state.subtext = action.payload.subtext;
      state.logo = action.payload.logo;
    },
    clearRecipient: (state) => {
      state.rname = '';
      state.subtext = '';
      state.logo = null;
    },
  },
});

export const { setRecipient, clearRecipient } = recipientSlice.actions;
export default recipientSlice.reducer;