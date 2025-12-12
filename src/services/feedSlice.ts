import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

export type TFeedResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TFeedState = {
  status: 'idle' | 'connecting' | 'open' | 'closed';
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: string;
};

export const initialState: TFeedState = {
  status: 'idle',
  orders: [],
  total: 0,
  totalToday: 0,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect: (state, action: PayloadAction<string>) => {
        state.status = 'connecting';
    },
    wsDisconnect: (state) => {
        state.status = 'closed';
    },
    wsOpen: (state) => {
        state.status = 'open';
        state.error = undefined;
    },
    wsClose: (state) => {
        state.status = 'closed';
    },
    wsError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<TFeedResponse>) => {
        // replace all
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } = feedSlice.actions;
export default feedSlice.reducer;