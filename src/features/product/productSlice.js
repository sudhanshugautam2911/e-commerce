import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct, fetchAllProductByFilter } from './productApi';

const initialState = {
  products: [], 
  status: 'idle',
  totalItems: 0
};

// fetch all the products
export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

// fetch by filter like by smartphone , laptop or a brand.
export const fetchAllProductByFilterAsync = createAsyncThunk(
  'product/fetchAllProductByFilter',
  async ({filter, sort, pagination}) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;  
      })
      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;  
        state.totalItems = action.payload.totalItems;  
      });
  },
});

export const { increment} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;
