import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter: (state, action) => {
      state = action.payload;
      return state.toLowerCase();
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
