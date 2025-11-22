import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

type TDetailsState = {
  selectedIngredient: TIngredient | null;
}

const initialState: TDetailsState = {
  selectedIngredient: null,
};

const detailsSlice = createSlice({
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