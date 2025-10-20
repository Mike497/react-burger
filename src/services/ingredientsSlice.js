import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from '../utils/burgers-api';

const initialState = {
  isLoading: false,
  hasError: false,
  items: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    ingredientsSuccess: (state, action) => {
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

export const getIngredients = () => async (dispatch) => {
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
