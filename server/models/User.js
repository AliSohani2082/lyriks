const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type:  String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  profileImg: { type: String },
})

module.exports = mongoose.model("User", userSchema)