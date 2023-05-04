const ProCategory = require("../models/blogCategoryModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await ProCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(`Error creating category ${error.message}`);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await ProCategory.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updateCategory);
    res.json(updateCategory);
  } catch (error) {
    throw new Error(`Error creating category ${error.message}`);
  }
});


const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await ProCategory.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(`Error creating category ${error.message}`);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await ProCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(`Error creating category ${error.message}`);
  }
});


const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await ProCategory.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(`Error creating category ${error.message}`);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
}