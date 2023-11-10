import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteCartItem, fetchAllBrands, fetchAllCategory, fetchAllProductByFilter, fetchAllProducts, fetchProductById, updateProduct } from './productApi';

const initialState = {
  products: [], 
  brands: [],
  category: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null
};


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
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
  async ({filter, sort, pagination, admin}) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination, admin);
    console.log("Product response is ", response.data);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state)=> {
      state.selectedProduct = null
    }
    
  },

  extraReducers: (builder) => {
    builder
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
        // state.products += action.payload;
      }) 
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product=> product.id === action.payload.id)
        state.products[index] = action.payload;
      }) 

      
  },
});

// example of without Async thunk
export const { clearSelectedProduct} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.category;
export const selectProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;
