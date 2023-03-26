import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "accepted",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.products = action.payload;
    },
    handleLoading: (state, action) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, handleLoading } = productSlice.actions;

export default productSlice.reducer;
