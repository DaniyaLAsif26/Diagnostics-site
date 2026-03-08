import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packSchema = new Schema({
  name: { type: String, required: true },
  relevance: Array,
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  popular: { type: Boolean, default: false },
  tests: Array 
}, { timestamps: true });

const Package = mongoose.model("Package", packSchema);

export default Package;