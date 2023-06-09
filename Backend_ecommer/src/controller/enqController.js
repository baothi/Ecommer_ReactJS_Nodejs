const Enquiry = require("../models/enqModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newEnquiry = await Enquiry.create(req.body);
    return res.status(200).json(newEnquiry);
  } catch (error) {
    throw new Error(`Error creating Enquiry ${error.message}`);
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  console.log("Updating Enquiry ", req.body);
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(`Error creating Enquiry ${error.message}`);
  }
});


const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteEnquiry);
  } catch (error) {
    throw new Error(`Error creating Enquiry ${error.message}`);
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getEnquiry = await Enquiry.findById(id);
    res.json(getEnquiry);
  } catch (error) {
    throw new Error(`Error creating Enquiry ${error.message}`);
  }
});


const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find();
    res.json(getAllEnquiry);
  } catch (error) {
    throw new Error(`Error creating Enquiry ${error.message}`);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry
}