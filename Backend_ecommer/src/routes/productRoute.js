const express = require('express');
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  deleteImages,
} = require("../controller/productController");

const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/", authMiddleware, isAdmin, createProduct);
// router.put(
//   "/upload/:id",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImgResize,
//   uploadImages
// );
router.put(
  "/upload",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/", getAllProducts);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);


module.exports = router;