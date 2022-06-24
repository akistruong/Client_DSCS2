import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as request from "./DanhMucApi";
import { notification } from "antd";
const initialState = {
  items: [],
  item: {},
  loading: false,
};
export const fetchCategoryAll = createAsyncThunk(
  "DanhMuc/fetchCategoryAll",
  async () => {
    const res = await request.GetAllCategory();
    return res;
  }
);
export const fetchCategoryDelete = createAsyncThunk(
  "DanhMuc/fetchCategoryDelete",
  async (id) => {
    const res = await request.DeleteCategory(id);
    return res;
  }
);
export const fetchCategoryUpdate = createAsyncThunk(
  "DanhMuc/fetchCategoryUpdate",
  async (params) => {
    const res = await request.UpdateCategory(params.id, params.body);
    return res;
  }
);
export const fetCategoryGetById = createAsyncThunk(
  "DanhMuc/fetCategoryGetById",
  async (id) => {
    const res = await request.GetCatById(id);
    return res;
  }
);
const DanhMucSlice = createSlice({
  name: "DanhMuc",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetCategoryGetById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetCategoryGetById.fulfilled, (state, action) => {
      state.loading = false;
      state.item = action.payload;
    });
    builder.addCase(fetchCategoryAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAll.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategoryDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryDelete.fulfilled, (state, action) => {
      const id = action.meta.arg;
      let temp = state.items.filter((x) => x._id != id);
      state.loading = false;
      state.items = temp;
      notification.open({
        message: "Xóa thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryDelete.rejected, (state, action) => {
      notification.open({
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
        type: "error",
      });
    });
    builder.addCase(fetchCategoryUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryUpdate.fulfilled, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryUpdate.rejected, (state, action) => {
      notification.open({
        message: "Cập nhật thất bại!",
        type: "error",
      });
    });
  },
});
export default DanhMucSlice;
