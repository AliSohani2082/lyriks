import mongoose from "mongoose";
const { Schema } = mongoose

const trackSchema = new Schema({
  id: { type: String },
  title: { type:  String, required: true },
  subtitle: { type: String, required: true},
  images: {
    background: { type: String },
    coverart: { type: String },
    coverarthq: { type: String },
    joecolor: { type: String },
  },
  url: { type: String, required: true },
  genres: { type: [String] },
  usersId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  listens: { type: Number } 
})

export default mongoose.model("Track", trackSchema)