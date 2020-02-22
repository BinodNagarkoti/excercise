// including mongoose require
const mongoose = require("mongoose");
// creating new mongoose Schema
const Schema = mongoose.Schema;
// creating user schema
const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);
// exporting User model
const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
