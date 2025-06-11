import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packSchema = new Schema({
  name: String,
  relevance: Array,
  price: Number,
  popular: Boolean,
  tests: Array  
});

const Package = mongoose.model("Package", packSchema);

export default Package ;