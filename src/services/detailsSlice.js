import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIngredient: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    clearIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { selectIngredient, clearIngredient } = detailsSlice.actions;
export default detailsSlice.reducer;