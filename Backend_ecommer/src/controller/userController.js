const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require('../config/refreshtoken');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const sendEmail = require('./emailController');
const uniqid = require('uniqid');



const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists")
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  // check if user already exists or not
  // console.log(email,password);
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken
    },
      {

        new: true
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })
    // console.log("login ok");
    return res.status(200).json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    });
  } else {
    return res.status(400).json(
      new Error("Invalid Credentials")
    )
  }
});

//admin login
const loginAdmin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  // check if user already exists or not
  const findAdmin = await User.findOne({ email });
  if (!findAdmin) {
    return res.status(400).send({
      message: 'This is an error!'
   });
  }
  if (findAdmin.role !== "admin"){
    return res.status(400).send({
      message: 'Not Authorised'
   });
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
      refreshToken: refreshToken
    },
      {

        new: true
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id)
    });
  } else {
    return res.status(400).send({
      message: 'Not Authorised'
   });
  }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with the refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken })
  });
});

//logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});


//update a user
const updateAUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        email: req.body?.email,
        mobile: req.body?.mobile
      },
      {
        new: true,
      }
    );
    res.json({
      _id: updateUser?._id,
      firstname: updateUser?.firstname,
      lastname: updateUser?.lastname,
      email: updateUser?.email,
      mobile: updateUser?.mobile,
      token: generateToken(updateUser?._id)
    })
  } catch (error) {
    throw new Error(error);
  }
});

const blockAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    )
    res.json({
      message: "User Blocked"
    })
  } catch (error) {
    throw new Error(error);
  }
});

const unblockAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    )
    res.json({
      message: "User UnBlocked"
    })
  } catch (error) {
    throw new Error(error);
  }
});

// save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user)
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateUser)
  } catch (error) {
    throw new Error(error);
  }
})

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error.message);
  }
});

// get a single user
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getauser = await User.findById(id);
    res.json(getauser);
  } catch (error) {
    throw new Error(error)
  }
});

// delete a single user
const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteauser = await User.findByIdAndDelete(id);
    res.json(deleteauser);
  } catch (error) {
    throw new Error(error)
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);

  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, please follow this to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  console.log("Reset Password : " ,password, token);
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUsers = await User.findById(_id).populate("wishList");
    res.json(findUsers)
  } catch (error) {
    throw new Error(error)
  }
});

const userCart = asyncHandler(async (req, res, next) => {
  const { productId,color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      quantity,
      price
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error)
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id }).populate("productId").populate("color");
    return res.status(200).json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromcart = await Cart.deleteOne({ userId: _id, _id: id })
    return res.status(200).json(deleteProductFromcart);
  } catch (error){
    throw new Error(error)
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) =>{
  const { _id } = req.user;
  const { cartItemId, quantity } = req.body;
  validateMongoDbId(_id);
  try {
    console.log(cartItemId,quantity)
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId })
    cartItem.quantity = quantity
    cartItem.save();
    return res.status(200).json(cartItem);
  } catch (error){
    throw new Error(error)
  }
});

const createOrder = asyncHandler(async (req, res) =>{
  const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({user:_id, shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount  });
    return res.status(200).json(order);
  } catch (error) {
    throw new Error(error)
  }
});

const getMyOrder = asyncHandler(async (req, res) =>{
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id }).populate("user").populate("orderItems.product").populate("orderItems.color");
    return res.status(200).json(orders);
  } catch (error) {
    throw new Error(error)
  }
});

const getAllOrder = asyncHandler(async (req, res) =>{
  const { _id } = req.user;
  try {
    const orders = await Order.find().populate("user").populate("orderItems.product").populate("orderItems.color");
    return res.status(200).json(orders);
  } catch (error) {
    throw new Error(error)
  }
});

const getMonthWiseOrderIncome = asyncHandler(async (req, res) =>{
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d  = new Date();
  let endDate = "";
  d.setDate(1);
  for( let index =0; index < 11; index ++){
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        }
      }
    },
    {
      $group: {
        _id:{month:"$month"},
        amount:{$sum:"$totalPriceAfterDiscount"},
        count:{$sum:1}
      }
    }
  ])
  console.log(data);
  return res.status(200).json(data);
});

const getYearlyTotalOrders = asyncHandler(async (req, res) =>{
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d  = new Date();
  let endDate = "";
  d.setDate(1);
  for( let index =0; index < 11; index ++){
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        }
      }
    },
    {
      $group: {
        _id:null,
        count:{$sum:1},
        amount:{$sum:"$totalPriceAfterDiscount"}
      }
    }
  ])
  console.log(data);
  return res.status(200).json(data);
});

// const emptyCart = asyncHandler(async (req, res) => {
//   console.log(req.user);
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const user = await User.findOne({ _id });
//     const cart = await Cart.findOneAndRemove({ orderby: user._id });
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const applyCoupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   const validCoupon = await Coupon.findOne({ name: coupon });
//   if (validCoupon === null) {
//     throw new Error("Invalid coupon")
//   }
//   const user = await User.findOne({ _id });
//   let { products, cartTotal } = await Cart.findOne({ orderby: user._id }).populate("products.product");
//   let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
//   let cartCoupon = await Cart.findOneAndUpdate({ orderby: user._id }, { totalAfterDiscount }, { new: true });
//   res.json(totalAfterDiscount);
// });

// const createOrder = asyncHandler(async (req, res) => {
//   const { COD, couponApplied } = req.body
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     if (!COD) throw new Error("create cash order failed");
//     const user = await User.findById(_id);
//     let userCart = await Cart.findOne({ orderby: user._id });
//     let finalAmout = 0;
//     if (couponApplied && userCart.totalAfterDiscount) {
//       finalAmout = userCart.totalAfterDiscount;
//     } else {
//       finalAmout = userCart.cartTotal;
//     }
//     let newOrder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmout,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "USD",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();
//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await Product.bulkWrite(update, {});
//     res.json({ message: "success" });
//   } catch (error) {
//     throw new Error(error)
//   }
// });

// const getOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const userOrder = await Order.findOne({ orderby: _id })
//     .populate("products.product")
//     .populate("orderby")
//     .exec();
//     res.json(userOrder);
//   } catch (error) {
//     throw new Error(error)
//   }
// });

// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const alluserorders = await Order.find()
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(alluserorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(id,validateMongoDbId(id))
  try {
    const userorders = await Order.findOne({ _id:id }).populate("orderItems.product").populate("orderItems.color");
    return res.status(200).json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});


const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findOrderStatus = await Order.findByIdAndUpdate(id, {
      orderStatus: status
    }, { new: true });
    res.json(findOrderStatus);
  } catch (error) {
    throw new Error(error)
  }
});

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
  handleRefreshToken,
  getAllUsers,
  updateAUser,
  saveAddress,
  getAUser,
  deleteAUser,
  blockAUser,
  unblockAUser,
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
};