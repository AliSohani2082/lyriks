import mongoose from "mongoose";
const { Schema } = mongoose

const playListSchema = new Schema({
  title: { type:  String, required: true },
  subtitle: { type:  String, required: true },
  tracksId: {
    type:  [mongoose.Schema.Types.ObjectId],
    ref: "Track",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isLikedPlayList: { type: Boolean },
})

export default mongoose.model("PlayList", playListSchema)