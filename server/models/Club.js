const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClubMemberSchema = new Schema({
  nickname: { type: String },
  role: {
    type: [Number],
    /* 
    1: Owner
    2: Admin
    3: Member
    */
    enum: [1, 2, 3],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const clubSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    background: { type: String },
    joecolor: { type: String },
  },
  membersId: {
    type: [ClubMemberSchema],
  },
  playlistsId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "PlayList",
  },
});

module.exports = mongoose.model("Club", clubSchema);
