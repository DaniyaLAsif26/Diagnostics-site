import mongoose from "mongoose";
import Appointment from "./appointment.js";
import Report from "./report.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    second_number: {
        type: Number,
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
        }
    ],
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]
})

userSchema.post('findOneAndDelete', async (user) => {
    if (!user) return

    await Promise.all([
        Report.updateMany({ user: user._id }, { $set: { user: null } }),
        Appointment.updateMany({ user: user._id }, { $set: { user: null } })
    ])
})

export default mongoose.models.User || mongoose.model("User", userSchema);