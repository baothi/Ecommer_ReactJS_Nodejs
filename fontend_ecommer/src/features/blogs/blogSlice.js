import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

const blogState = {
  blog: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk(
  "blog/get", 
  async(thunkAPI)=>{
  try {
    return blogService.getBlogs()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const getaBlog = createAsyncThunk(
  "blog/singleblog", 
  async(id,thunkAPI)=>{
  try {
    return blogService.getABlog(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const blogSlice = createSlice({
  name: 'blog',
  initialState: blogState,
  reducers:{},
  extraReducers: (buildeer)=>{
    buildeer
      .addCase(getAllBlogs.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getAllBlogs.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getaBlog.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getaBlog.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
      })
      .addCase(getaBlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
  },
})

export default blogSlice.reducer;