import mongoose from "mongoose";
const Schema = mongoose.Schema;


const OtpSessionSchema = new Schema({
    mobileNo: {
        type: Number,
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }
})

export default mongoose.model("OtpSession", OtpSessionSchema);