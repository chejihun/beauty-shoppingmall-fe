import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import commonUiReducer from "./commonUiReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import postReducer from "./postReducer";
import orderReducer from "./orderReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUiReducer,
    product: productReducer,
    cart: cartReducer,
    post: postReducer,
    order: orderReducer
  },
});

export default store;
