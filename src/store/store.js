import { configureStore } from "@reduxjs/toolkit";
import localListReducer from "./localListSlice";
import seachListReducer from "./searchSlice";

export const store = configureStore({
  reducer:{
    localList : localListReducer,
    searchList : seachListReducer,
  }
})