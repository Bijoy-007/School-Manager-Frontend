import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    loginReducer: (state) => {
      state.isLoggedIn = true;
    },
    logoutReducer: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
