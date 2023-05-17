import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`);
  if (response.data) {
    return response.data;
  }
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

const blogService = {
  getBlogs,
  getABlog,
};

export default blogService;
