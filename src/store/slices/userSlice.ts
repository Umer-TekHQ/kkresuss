import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Images } from '../../assets';

interface UserState {
  email: string;
  username: string;
  profilePicture: any; 
}

const initialState: UserState = {
  email: '',
  username: '',
  profilePicture: Images.profileicon, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action: PayloadAction<any>) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setEmail, setUsername, setProfilePicture } = userSlice.actions;

export default userSlice.reducer; 