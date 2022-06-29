import { configureStore } from "@reduxjs/toolkit";
import DanhMucSlice from "../slices/DanhMuc";
import BSTSlice from "../slices/BoSuuTap";
import SanPhamSlice from "../slices/SanPham";
export const store = configureStore({
  reducer: {
    DanhMuc: DanhMucSlice.reducer,
    BoSuuTap: BSTSlice.reducer,
    SanPham: SanPhamSlice.reducer,
  },
});
