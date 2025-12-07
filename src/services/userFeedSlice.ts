import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedResponse } from './feedSlice';
import { TOrder } from '../utils/types';

type TUserFeedState = {
  status: 'idle' | 'connecting' | 'open' | 'closed';
  orders: TOrder[];
  error?: string;
};

const initialState: TUserFeedState = {
  status: 'idle',
  orders: [],
};

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    userWsConnect: (state, action: PayloadAction<string>) => {
      state.status = 'connecting';
    },
    userWsDisconnect: (state) => {
      state.status = 'closed';
    },
    userWsOpen: (state) => {
      state.status = 'open';
      state.error = undefined;
    },
    userWsClose: (state) => {
      state.status = 'closed';
    },
    userWsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    userWsMessage: (state, action: PayloadAction<TFeedResponse>) => {
      state.orders = action.payload.orders;
    },
  },
});

export const { 
    userWsConnect, 
    userWsDisconnect, 
    userWsOpen, 
    userWsClose, 
    userWsError, 
    userWsMessage 
} = userFeedSlice.actions;

export default userFeedSlice.reducer;