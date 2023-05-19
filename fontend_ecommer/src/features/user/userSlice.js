import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage,
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
});

export const getUserWislist = createAsyncThunk(
  "auth/userwislist",  
  async(thunkAPI)=>{
  try {
    return authService.getUserWislist()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addProdToCart = createAsyncThunk(
  "auth/cart/add",  
  async(cartData,thunkAPI)=>{
  try {
    return authService.addToCart(cartData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createAOrder = createAsyncThunk(
  "auth/cart/create-order",   
  async(orderDetail,thunkAPI)=>{
  try {
    return authService.createOrder(orderDetail)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUserCart = createAsyncThunk(
  "auth/cart/get",  
  async(thunkAPI)=>{
  try {
    return authService.getCart()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCartProduct = createAsyncThunk(
  "auth/cart/product/delete",   
  async(cartItemId,thunkAPI)=>{
  try {
    return authService.removeProductFromCart(cartItemId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const updateCartProduct = createAsyncThunk(
  "auth/cart/product/update",   
  async(cartDetail,thunkAPI)=>{
  try {
    return authService.updateProductFromCart(cartDetail)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrders = createAsyncThunk(
  "auth/order/get",   
  async(thunkAPI)=>{
  try {
    return authService.getUserOrders()
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/profile/update",   
  async(data,thunkAPI)=>{
  try {
    return authService.updateUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgotPasswordToken = createAsyncThunk(
  "auth/password/token",   
  async(data,thunkAPI)=>{
  try {
    return authService.forgotPassToken(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const ResetPassword = createAsyncThunk(
  "auth/password/reset",   
  async(data,thunkAPI)=>{
  try {
    return authService.ResetPass(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


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
        if(state.isSuccess===true){
          localStorage.setItem("customer", JSON.stringify(action.payload));
          toast.success("User login successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.error("Thông tin đăng nhập sai");
        }
      })
      .addCase(getUserWislist.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getUserWislist.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "success";
      })
      .addCase(getUserWislist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
      })
      .addCase(addProdToCart.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(addProdToCart.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if(state.isSuccess){
          toast.success("Product Added To Cart");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
      })
      .addCase(getUserCart.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getUserCart.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getCartProduct = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(deleteCartProduct.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletecartproduct = action.payload;
        if(state.isSuccess){
          toast.success("Product Delete From Cart Success");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(updateCartProduct.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(updateCartProduct.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if(state.isSuccess){
          toast.success("Product updated From Cart Success");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(createAOrder.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(createAOrder.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderdProduct = action.payload;
        if(state.isSuccess){
          toast.success("Orderd Success");
        }
      })
      .addCase(createAOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(getOrders.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(getOrders.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getOrderedProduct = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(updateProfile.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(updateProfile.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if(state.isSuccess===true){
          localStorage.setItem("customer", JSON.stringify(action.payload));
          toast.success("User login successfully");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(forgotPasswordToken.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(forgotPasswordToken.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        if(state.isSuccess){
          toast.success("Email send successfully");
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
      .addCase(ResetPassword.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(ResetPassword.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.resetpass = action.payload;
        if(state.isSuccess){
          toast.success("Password udpate successfully");
        }
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        state.isLoading = false;
        if(state.isSuccess===false){
          toast.success("Something went wrong");
        }
      })
  },
})

export default authSlice.reducer;
