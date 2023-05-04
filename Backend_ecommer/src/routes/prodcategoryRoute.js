const express = require('express');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
} = require("../controller/prodcategoryController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.put("/likes", authMiddleware, isAdmin, (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", authMiddleware, isAdmin, getCategory);
router.get("/", authMiddleware, isAdmin, getAllCategory);





module.exports = router;