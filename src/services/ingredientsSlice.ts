import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadIngredients } from '../utils/burgers-api';
import { TIngredient } from '../utils/types';
import { AppThunk } from './store';

type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  items: TIngredient[];
}

const initialState: TIngredientsState = {
  isLoading: false,
  hasError: false,
  items: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    ingredientsSuccess: (state, action: PayloadAction<TIngredient[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    ingredientsFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.items = [];
    },
  },
});

export const getIngredients = (): AppThunk => async (dispatch) => {
  dispatch(ingredientsRequest());
  try {
    const response = await loadIngredients();
    dispatch(ingredientsSuccess(response.data));
  } catch (error) {
    console.error('Error on loading ingredients: ', error);
    dispatch(ingredientsFailed());
  }
};

export const { ingredientsRequest, ingredientsSuccess, ingredientsFailed } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;