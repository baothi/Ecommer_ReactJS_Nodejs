import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    // localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};

const getUserWislist = async()=>{
  const response= await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async(cartData)=>{
  const response = await axios.post(`${base_url}user/cart`,cartData, config);
  if (response.data) {
    return response.data;
  }
};

const getCart = async()=>{
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async(cartItemId)=>{
  const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`, config);
  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async(cartDetail)=>{
  const response = await axios.put(`${base_url}user/update-product-cart`,cartDetail, config);
  if (response.data) {
    return response.data;
  }
};

const createOrder = async(orderDetail)=>{
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail, config);
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async()=>{
  const response = await axios.get(`${base_url}user/getmyorders`,config)
  if (response.data) {
    return response.data;
  }
};

const updateUser = async(data)=>{
  console.log(data);
  const response = await axios.put(`${base_url}user/edit-user`,data,config)
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async(data)=>{
  const response = await axios.post(`${base_url}user/forgot-password-token`,data)
  if (response.data) {
    return response.data;
  }
};

const authService = {
  register,
  login,
  getUserWislist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
};

export default authService;
