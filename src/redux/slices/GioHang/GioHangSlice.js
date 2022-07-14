import { createSlice } from "@reduxjs/toolkit";
const cart = JSON.parse(localStorage.getItem("cart"));
console.log({ cart });
const initialState = {
  cartItems: cart || [],
  totalPrice: cart?.totalPrice || 0,
  totalQty: cart?.totalQty || 0,
  code: cart?.code || null,
};

const GioHangSlice = createSlice({
  initialState,
  name: "GioHang",
  reducers: {
    ViewCart(state, action) {
      var cart = localStorage.getItem("cart");
      var cartObj = JSON.parse(cart);
      if (cartObj) {
        alert("Cart tồn tại");
      } else {
        alert("Cart rỗng");
      }
    },
    AddToCart(state, action) {
      const cart = localStorage.getItem("cart");
      const cartObj = JSON.parse(cart);
      if (cartObj) {
        const cartItem = state.cartItems.find(
          (x) =>
            x.maSanPham == action.payload.maSanPham &&
            x.size == action.payload.size
        );
        if (cartItem) {
          var index = state.cartItems.indexOf(cartItem);
          state.cartItems[index].qty++;
          state.totalPrice += action.payload.giaBan;
          localStorage.setItem("cart", JSON.stringify(state));
        } else {
          state.cartItems.push(action.payload);
          state.totalQty++;
          state.totalPrice += action.payload.giaBan;
          localStorage.setItem("cart", JSON.stringify(state));
        }
      } else {
        state.cartItems.push(action.payload);
        state.code = 0;
        state.totalPrice = action.payload.giaBan;
        state.totalQty = 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { ViewCart, AddToCart } = GioHangSlice.actions;

export default GioHangSlice;
