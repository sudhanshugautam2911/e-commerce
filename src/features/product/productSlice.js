import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategory, fetchAllProduct, fetchAllProductByFilter } from './productApi';

const initialState = {
  products: [], 
  brands: [],
  category: [],
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

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);
export const fetchAllCategoryAsync = createAsyncThunk(
  'product/fetchAllCategory',
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);

// fetch by filter like by smartphone , laptop or a brand.
export const fetchAllProductByFilterAsync = createAsyncThunk(
  'product/fetchAllProductByFilter',
  async ({filter, sort, pagination}) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination);
    // console.log(response.data);
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
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;  
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })
      
  },
});

export const { increment} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.category;


export default productSlice.reducer;
