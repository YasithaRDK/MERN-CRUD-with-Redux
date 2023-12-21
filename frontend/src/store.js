import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice/studentSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
