import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import commonUiReducer from "./commonUiReducer";
import productReducer from "./productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUiReducer,
    product: productReducer
  },
});

export default store;
