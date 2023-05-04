const express = require('express');
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand
} = require("../controller/brandController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.put("/likes", authMiddleware, isAdmin, (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);





module.exports = router;