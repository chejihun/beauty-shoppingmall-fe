import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import commonUiReducer from "./commonUiReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUiReducer
  },
});

export default store;
