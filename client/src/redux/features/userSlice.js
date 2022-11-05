import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authData: null,
  isLogedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth: (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      state.authData = action?.data;
      state.isLogedIn = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.authData = null
      state.isLogedIn = false;
    },
    signin: (state) => {
      try {
        const { data } = await
      }
    }
  },
});

export const { auth, logout } = userSlice.actions;

export default userSlice.reducer;
