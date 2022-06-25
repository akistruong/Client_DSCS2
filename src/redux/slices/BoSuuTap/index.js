import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./BoSuuTapApi";
export const fetchAllBST = createAsyncThunk(
  "BoSuuTap/fetchAllBST",
  async (params) => {
    const { query } = params;
    const res = await api.GetAllBST(query);
    return res;
  }
);
export const fetchByIdBST = createAsyncThunk(
  "BoSuuTap/fetchByIdBST",
  async (params) => {
    const { id } = params;
    const res = await api.GetBSTById(id);
    return res;
  }
);
export const fetchPostBST = createAsyncThunk(
  "BoSuuTap/fetchPostBST",
  async (params) => {
    const { body } = params;
    const res = await api.PostBST(body);
    return res;
  }
);
export const fetchPutBST = createAsyncThunk(
  "BoSuuTap/fetchPutBST",
  async (params) => {
    const { body, id } = params;
    const res = await api.PutBST(id, body);
    return res;
  }
);
export const fetchDeleteBST = createAsyncThunk(
  "BoSuuTap/fetchDeleteBST",
  async (params) => {
    const { id } = params;
    const res = await api.DeleteBST(id);
    return res;
  }
);
const initialState = {
  boSuuTaps: [],
  boSuuTap: {},
  loading: false,
};
const BSTSlice = createSlice({
  initialState,
  name: "BoSuuTap",
  extraReducers: (builder) => {
    builder.addCase(fetchAllBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBST.fulfilled, (state, action) => {
      state.loading = false;
      state.boSuuTaps = action.payload;
    });
    builder.addCase(fetchAllBST.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchByIdBST
    builder.addCase(fetchByIdBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchByIdBST.fulfilled, (state, action) => {
      state.loading = true;
      state.boSuuTap = action.payload;
    });
    builder.addCase(fetchByIdBST.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchPostBST
    builder.addCase(fetchPostBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostBST.fulfilled, (state, action) => {
      state.loading = false;
      state.boSuuTaps = [...state.boSuuTaps, action.payload];
    });
    builder.addCase(fetchPostBST.rejected, (state) => {
      state.loading = false;
    });
    //fetchPutBST
    builder.addCase(fetchPutBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPutBST.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchPutBST.rejected, (state) => {
      state.loading = false;
    });
    //fetchDeleteBST
    builder.addCase(fetchDeleteBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteBST.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.meta.arg;
      let temp = [...state.boSuuTaps];
      let obj = temp.find((x) => x.id == id);
      let index = temp.indexOf(obj);
      if (index != -1) {
        temp.splice(index, 1);
        state.boSuuTaps = temp;
      }
    });
    builder.addCase(fetchDeleteBST.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default BSTSlice;
