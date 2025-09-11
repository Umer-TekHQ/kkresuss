import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Images } from '../../assets';

interface UserState {
  email: string;
  username: string;
  profilePicture: any; 
  otpToken: string | null;
}

const initialState: UserState = {
  email: '',
  username: '',
  profilePicture: Images.profileIcon, 
  otpToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setOtpToken: (state, action: PayloadAction<string>) => {
      state.otpToken = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<any>) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setEmail, setUsername, setProfilePicture,  setOtpToken } = userSlice.actions;

export default userSlice.reducer; 