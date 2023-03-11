const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: { type: String },
  playlistsId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "PlayList",
  },
  likedSongs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlayList",
  },
  follow: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

module.exports = mongoose.model("User", userSchema);
