import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import detailsReducer from "./detailsSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    details: detailsReducer,
    order: orderReducer,
    auth: authReducer
  },
});
