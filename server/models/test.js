import mongoose from "mongoose";
const Schema = mongoose.Schema

const testSchema = new Schema({
    name: String,
    relevance: String,
    price: Number,
    popular:Boolean
})

const Test = mongoose.model("Test", testSchema);

export default Test;