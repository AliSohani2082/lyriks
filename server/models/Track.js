const mongoose = require("mongoose");
const { Schema } = mongoose;

const trackSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  images: {
    background: { type: String },
    coverart: { type: String },
    coverarthq: { type: String },
    joecolor: { type: String },
  },
  url: { type: String, required: true },
  genres: { type: [String] },
  ArtistsId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  listens: { type: Number },
});

module.exports = mongoose.model("Track", trackSchema);
