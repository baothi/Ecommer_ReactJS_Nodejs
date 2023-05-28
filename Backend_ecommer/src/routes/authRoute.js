const express = require('express');
const { createUser,
  loginUser,
  loginAdmin,
  getAllUsers,
  updateAUser,
  saveAddress,
  getAUser,
  deleteAUser,
  blockAUser,
  unblockAUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishlist,
  userCart,
  getUserCart,
  createOrder,
  // emptyCart,
  // applyCoupon,
  // createOrder,
  // getOrders,
  // getAllOrders,
  getOrderByUserId,
  updateOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrder,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrder,

} = require("../controller/userController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();


// router.post("/register", (req, res) => {
//   console.log(req.body);
//   return res.status(200).json({
//     EC: 0,
//     data: req.body
//   });
// });



router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
// router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
// router.post("/cart/cash-order", authMiddleware, createOrder);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyTotalOrders", authMiddleware, getYearlyTotalOrders);
router.get("/getAllOrder", authMiddleware,isAdmin, getAllOrder);
router.get("/all-users",authMiddleware, isAdmin, getAllUsers);
router.get("/getmyorders", authMiddleware, getMyOrder);
// router.get("/get-orders", authMiddleware, getOrders);
// router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getorderbyuser/:id",authMiddleware, isAdmin, getOrderByUserId);
router.put("/edit-user", authMiddleware, updateAUser);

router.put("/block-user/:id", authMiddleware, isAdmin, blockAUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockAUser);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/delete-product-cart/:id", authMiddleware, removeProductFromCart);
router.put("/update-product-cart", authMiddleware, updateProductQuantityFromCart);
// router.delete("/empty-cart", authMiddleware, emptyCart)
router.delete("/:id", deleteAUser);






module.exports = router;

