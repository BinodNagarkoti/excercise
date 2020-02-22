// including mongoose require
const mongoose = require("mongoose");
// creating new mongoose Schema
const Schema = mongoose.Schema;
// creating user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},
  {
    timestamps: true
  }
);
// exporting User model
const User = mongoose.model("User", userSchema);
module.exports = User;
