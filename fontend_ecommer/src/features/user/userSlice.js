import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";


const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: "",
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register", 
  async(userData,thunkAPI)=>{
  try {
    return authService.register(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk(
  "auth/login", 
  async(userData,thunkAPI)=>{
  try {
    return authService.login(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers:{},
  extraReducers: (buildeer)=>{
    buildeer
      .addCase(registerUser.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createUser = action.payload;
        state.message = "success";
        if(state.isSuccess===true){
          toast.success("User registered successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.error(action.error);
        }
      })
      .addCase(loginUser.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        localStorage.setItem("token", action.payload.token);
        if(state.isSuccess===true){
          toast.success("User login successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.error(action.error);
        }
      })
  },
})

export default authSlice.reducer;