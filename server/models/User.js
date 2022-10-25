import mongoose from "mongoose";
import PlayList from "./PlayList";
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type:  String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  profileImg: { type: String },
})

export default mongoose.model("User", userSchema)