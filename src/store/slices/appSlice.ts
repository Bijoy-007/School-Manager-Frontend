import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schoolName: '',
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setSchoolName: (state) => {
      const schoolName = localStorage.getItem('schoolName') || '';
      state.schoolName = schoolName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSchoolName } = appSlice.actions;

export default appSlice.reducer;
