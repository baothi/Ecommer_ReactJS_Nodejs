import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import authReducer from "../features/user/userSlice";
import producReducer from '../features/products/productSlice';
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: producReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});
