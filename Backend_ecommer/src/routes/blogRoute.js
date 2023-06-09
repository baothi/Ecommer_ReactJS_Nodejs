const express = require('express');
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
  getImageBlog,
} = require("../controller/blogController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");

const router = express.Router();


// router.put("/likes", authMiddleware, isAdmin, (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImgResize,
  uploadImages
);
router.put("/dislikes", authMiddleware, disliketheBlog);
router.put("/likes", authMiddleware, liketheBlog);

router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/images/:id", getImageBlog);
router.get("/", getAllBlog);
router.delete("/:id", deleteBlog);





module.exports = router;
