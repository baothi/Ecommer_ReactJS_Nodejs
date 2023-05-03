const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("this is not valid or not found");
};

module.exports = validateMongoDbId