import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import commonUiReducer from "./commonUiReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import postReducer from "./postReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUiReducer,
    product: productReducer,
    cart: cartReducer,
    post: postReducer,
  },
});

export default store;
