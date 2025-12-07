import { combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socket-middleware";

import ingredientsReducer, { ingredientsSlice } from "./ingredientsSlice";
import constructorReducer, { constructorSlice } from "./constructorSlice";
import detailsReducer, { detailsSlice } from "./detailsSlice";
import orderReducer, { orderSlice } from "./orderSlice";
import authReducer, { authSlice } from "./authSlice";
import feedReducer, { feedSlice } from "./feedSlice";
import userFeedReducer, { userFeedSlice } from "./userFeedSlice";

const feedWsActions = {
  wsConnect: feedSlice.actions.wsConnect,
  wsDisconnect: feedSlice.actions.wsDisconnect,
  onOpen: feedSlice.actions.wsOpen,
  onClose: feedSlice.actions.wsClose,
  onError: feedSlice.actions.wsError,
  onMessage: feedSlice.actions.wsMessage,
};

const userFeedWsActions = {
    wsConnect: userFeedSlice.actions.userWsConnect,
    wsDisconnect: userFeedSlice.actions.userWsDisconnect,
    onOpen: userFeedSlice.actions.userWsOpen,
    onClose: userFeedSlice.actions.userWsClose,
    onError: userFeedSlice.actions.userWsError,
    onMessage: userFeedSlice.actions.userWsMessage,
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  userFeed: userFeedReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(feedWsActions))
  .concat(socketMiddleware(userFeedWsActions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

type TApplicationActions = 
  | ReturnType<typeof authSlice.actions[keyof typeof authSlice.actions]>
  | ReturnType<typeof constructorSlice.actions[keyof typeof constructorSlice.actions]>
  | ReturnType<typeof detailsSlice.actions[keyof typeof detailsSlice.actions]>
  | ReturnType<typeof ingredientsSlice.actions[keyof typeof ingredientsSlice.actions]>
  | ReturnType<typeof orderSlice.actions[keyof typeof orderSlice.actions]>
  | ReturnType<typeof feedSlice.actions[keyof typeof feedSlice.actions]>
  | ReturnType<typeof userFeedSlice.actions[keyof typeof userFeedSlice.actions]>;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn, 
  RootState, 
  unknown,
  TApplicationActions
>;