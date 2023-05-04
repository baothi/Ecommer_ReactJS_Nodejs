const express = require('express');
const {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCoupons
} = require("../controller/couponController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.put("/likes", authMiddleware, isAdmin, (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });

router.post("/", authMiddleware, isAdmin, createCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/:id", getCoupon);
router.get("/", getAllCoupons);





module.exports = router;