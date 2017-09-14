const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  created: Date,
  modified: Date,
  modifiedBy: Number
});
