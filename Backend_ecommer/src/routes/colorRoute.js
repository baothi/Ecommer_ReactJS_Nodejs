const express = require('express');
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor
} = require("../controller/colorController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.put("/likes", authMiddleware, isAdmin, (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);





module.exports = router;