import { configureStore } from "@reduxjs/toolkit";
import localListReducer from "./localListSlice";

export const store = configureStore({
  reducer:{
    localList : localListReducer,
  }
})