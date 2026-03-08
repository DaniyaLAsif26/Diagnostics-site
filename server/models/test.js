import mongoose from "mongoose";
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  relevance: String,
  patientPreparation: String,
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);

export default Test;
