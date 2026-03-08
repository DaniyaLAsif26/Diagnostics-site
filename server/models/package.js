import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packSchema = new Schema({
  name: { type: String, required: true },
  relevance: { type: [String], default: [] },
  price: { type: Number, required: true },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

const Package = mongoose.model("Package", packSchema);

export default Package;