import { configureStore } from "@reduxjs/toolkit";
import DanhMucSlice from "../slices/DanhMuc";
export const store = configureStore({
  reducer: {
    DanhMuc: DanhMucSlice.reducer,
  },
});
