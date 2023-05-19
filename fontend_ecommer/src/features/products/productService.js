import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  // console.log("getSingleProduct : ",response.data);
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (prodId) => {
  const response = await axios.put(`${base_url}product/wishlist`, {prodId}, config);
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
  rateProduct,
};

export default productService;
