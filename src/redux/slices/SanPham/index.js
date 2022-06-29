import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as Api from "./SanPhamApi";
const initialState = {
  products: [],
  product: {},
  loading: {
    btnLoading: false,
    tableLoading: false,
  },
  totalRow: 0,
};

export const fetchGetAllProducts = createAsyncThunk(
  "fetchGetAllProducts",
  async (params) => {
    const res = await Api.GetAllProducts(params);
    return res;
  }
);
export const fetchGetProduct = createAsyncThunk(
  "fetchGetProduct",
  async (params) => {
    const { id } = params;
    const res = await Api.GetProductById(id);
    return res;
  }
);
export const fetchPostProduct = createAsyncThunk(
  "fetchPostProduct",
  async (params, { rejectWithValue }) => {
    const { body } = params;
    try {
      const res = await Api.PostProduct(body);
      return res;
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const fetchPutProduct = createAsyncThunk(
  "fetchPutProduct",
  async (params) => {
    const { id, body } = params;
    const res = await Api.PutProduct(id, body);
    return res;
  }
);
export const fetchDeleteProduct = createAsyncThunk(
  "fetchDeleteProduct",
  async (params) => {
    const { id } = params;
    const res = await Api.DeleteProduct(id);
    return res;
  }
);
const SanPhamSlice = createSlice({
  initialState,
  name: "SanPham",
  extraReducers: (builder) => {
    //fetchGetAllProducts
    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.loading.tableLoading = true;
    });
    builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
      state.loading.tableLoading = false;
      const { products, totalRow } = action.payload;
      state.products = products;
      state.totalRow = totalRow;
    });
    //fetchGetProduct
    builder.addCase(fetchGetProduct.pending, (state) => {});
    builder.addCase(fetchGetProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    //fetchPostProduct
    builder.addCase(fetchPostProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchPostProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      state.loading.btnLoading = false;
      notification.open({
        message: "Thêm thành công",
        type: "success",
      });
    });
    builder.addCase(fetchPostProduct.rejected, (state, action) => {
      state.loading.btnLoading = false;
      console.log({ err: action.payload });
    });
    //fetchPutProduct
    builder.addCase(fetchPutProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchPutProduct.fulfilled, (state, action) => {
      state.loading.btnLoading = false;
    });
    builder.addCase(fetchPutProduct.rejected, (state) => {
      state.loading.btnLoading = false;
    });
    //fetchDeleteProduct
    builder.addCase(fetchDeleteProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.loading.btnLoading = false;
      var temp = [...state.products];
      var obj = temp.find((x) => x.maSanPham == action.meta.arg.id);
      var index = temp.indexOf(obj);
      if (index > -1) {
        temp.splice(index, 1);
        state.products = temp;
      }
      notification.open({
        message: "Xóa thành công",
        type: "success",
      });
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {
      state.loading.btnLoading = false;
      console.log({ ERR: action.error });
    });
  },
});

export default SanPhamSlice;
