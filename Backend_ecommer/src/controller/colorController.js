const Color = require("../models/colorModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(`Error creating Color ${error.message}`);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updateColor);
    res.json(updateColor);
  } catch (error) {
    throw new Error(`Error creating Color ${error.message}`);
  }
});


const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteColor = await Color.findByIdAndDelete(id);
    res.json(deleteColor);
  } catch (error) {
    throw new Error(`Error creating Color ${error.message}`);
  }
});

const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getColor = await Color.findById(id);
    res.json(getColor);
  } catch (error) {
    throw new Error(`Error creating Color ${error.message}`);
  }
});


const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getAllColor = await Color.find();
    res.json(getAllColor);
  } catch (error) {
    throw new Error(`Error creating Color ${error.message}`);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor
}