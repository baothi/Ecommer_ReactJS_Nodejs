import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const productState = {
  product: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  wishlist: "",
};

export const getAllProducts = createAsyncThunk(
  "product/get", 
  async(data,thunkAPI)=>{
  try {
    return productService.getProducts(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAProduct = createAsyncThunk(
  "product/singleproduct",
  async(id,thunkAPI)=>{
  try {
    return productService.getSingleProduct(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToWishList = createAsyncThunk(
  "product/wishlist",  
  async(prodId,thunkAPI)=>{
  try {
    return productService.addToWishList(prodId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addRating = createAsyncThunk(
  "product/rating",  
  async(data,thunkAPI)=>{
  try {
    return productService.rateProduct(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});



export const productSlice = createSlice({
  name: 'product',
  initialState: productState,
  reducers:{},
  extraReducers: (buildeer)=>{
    buildeer
      .addCase(getAllProducts.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getAllProducts.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getAProduct.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getAProduct.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(addToWishList.pending,((state,action)=>{
        state.isLoading=true
      }))
      .addCase(addToWishList.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "Product added to wish list !"
      })
      .addCase(addToWishList.rejected, (state, action) => {
        console.log("Product added to wish list " , action.error);
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(addRating.pending,((state,action)=>{
        state.isLoading=true
      }))
      .addCase(addRating.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message = "Rating Added Successfully";
        if(state.isSuccess){
          toast.success("Rating Added Successfully");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
  },
})

export default productSlice.reducer;
