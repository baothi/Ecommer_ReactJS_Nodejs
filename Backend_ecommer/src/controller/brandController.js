const Brand = require("../models/brandModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(`Error creating Brand ${error.message}`);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updateBrand);
    res.json(updateBrand);
  } catch (error) {
    throw new Error(`Error creating Brand ${error.message}`);
  }
});


const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(`Error creating Brand ${error.message}`);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(`Error creating Brand ${error.message}`);
  }
});


const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(`Error creating Brand ${error.message}`);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand
}