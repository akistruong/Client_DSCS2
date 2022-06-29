import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as request from "./DanhMucApi";
import { notification } from "antd";
const initialState = {
  items: [],
  item: {},
  loading: false,
  hangmucs: [],
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
export const fetchCategoryGetById = createAsyncThunk(
  "DanhMuc/fetchCategoryGetById",
  async (id) => {
    const res = await request.GetCatById(id);
    return res;
  }
);
export const fetchCategoryAdd = createAsyncThunk(
  "DanhMuc/fetchCategoryAdd",
  async (params) => {
    const { body } = params;
    const res = await request.PostCategory(body);
    return res;
  }
);
export const fetchGetParentCategory = createAsyncThunk(
  "DanhMuc/fetchGetParentCategory",
  async (params) => {
    const res = await request.GetAllHangMuc();
    return res;
  }
);
export const fetchGetCateByParent = createAsyncThunk(
  "DanhMuc/fetchGetCateByParent",
  async (params) => {
    const res = await request.GetAllCateByParentCat();
    return res;
  }
);
const DanhMucSlice = createSlice({
  name: "DanhMuc",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryAdd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAdd.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.loading = false;
      notification.open({
        message: "Thêm thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryAdd.rejected, () => {
      notification.open({
        message: "Có lỗi xảy ra",
        type: "error",
      });
    });
    builder.addCase(fetchCategoryGetById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryGetById.fulfilled, (state, action) => {
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
      state.loading = false;
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
      state.loading = false;
      notification.open({
        message: "Cập nhật thất bại!",
        type: "error",
      });
    });
    //fetchGetParentCategory
    builder.addCase(fetchGetParentCategory.fulfilled, (state, action) => {
      state.hangmucs = action.payload;
    });
    //fetchGetCateByParent
    builder.addCase(fetchGetCateByParent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetCateByParent.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchGetCateByParent.rejected, (state, action) => {
      state.loading = false;
      console.log({ ERR: action.error.message });
    });
  },
});
export default DanhMucSlice;
