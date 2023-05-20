import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
  console.log(data);
  const response = await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
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
