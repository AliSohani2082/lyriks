const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
  name: { type: String, required: true },
  profileImg: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model("User", artistSchema);
