import mongoose from "mongoose";
import User from './user.js'
import Appointment from "./appointment.js";
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    uniq_id: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, { timestamps: true });


reportSchema.post('findOneAndDelete', async (report) => {
    if (!report?.user) return;

    try {
        await User.updateOne(
            { _id: report.user },
            { $pull: { reports: report._id } }
        )

        await Appointment.updateOne(
            { uniq_id: report.uniq_id },
            { $set: { report: null } }
        )
    }
    catch (err) {
        console.log("Error", err)
    }
})

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
