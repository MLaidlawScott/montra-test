import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookCartItem } from "../types";
import type { RootState } from "./index";

interface CartState {
  items: BookCartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<BookCartItem["isbn"]>) => {
      const firstIndex = state.items.findIndex(
        (book) => book.isbn === action.payload
      );
      state.items.splice(firstIndex, 1);
    },
    addItem: (state, action: PayloadAction<BookCartItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { removeItem, addItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
