import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

type TDetailsState = {
  selectedIngredient: TIngredient | null;
}

export const initialState: TDetailsState = {
  selectedIngredient: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    clearIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { selectIngredient, clearIngredient } = detailsSlice.actions;
export default detailsSlice.reducer;