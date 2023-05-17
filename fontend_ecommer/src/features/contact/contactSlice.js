import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

const contactState = {
  contact: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  wishlist: "",
};

export const createQuery = createAsyncThunk(
  "contact/post", 
  async(contactData,thunkAPI)=>{
  try {
    return contactService.postQuery(contactData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});



export const contactSlice = createSlice({
  name: 'contact',
  initialState: contactState,
  reducers:{},
  extraReducers: (buildeer)=>{
    buildeer
      .addCase(createQuery.pending,(state=>{
        state.isLoading=true
      }))
      .addCase(createQuery.fulfilled,(state,action)=>{
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
        if (state.isSuccess === true){
          toast.success("Contact Form submitted successfully");
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true){
          toast.success("Contact Form submitted error");
        }
      })
  },
})

export default contactSlice.reducer;