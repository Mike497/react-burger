import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postOrder } from '../utils/burgers-api';
import { clearConstructor } from './constructorSlice';
import { AppDispatch } from './store';

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  orderNumber: number | null;
}

const initialState: TOrderState = {
  isLoading: false,
  hasError: false,
  orderNumber: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    createOrderSuccess: (state, action: PayloadAction<number>) => {
      state.orderNumber = action.payload;
      state.isLoading = false;
    },
    createOrderFailed: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    clearOrder: (state) => {
      state.orderNumber = null;
    },
  },
});

export const createOrder = (ingredientIds: string[]) => async (dispatch: AppDispatch) => {
  dispatch(createOrderRequest());
  try {
    const response = await postOrder(ingredientIds);
    dispatch(createOrderSuccess(response.order.number));
    dispatch(clearConstructor());
  } catch (error) {
    console.error('Error on order creation: ', error);
    dispatch(createOrderFailed());
  }
};

export const { createOrderRequest, createOrderSuccess, createOrderFailed, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;