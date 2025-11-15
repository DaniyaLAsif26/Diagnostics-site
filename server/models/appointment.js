import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone_no: {
        type: String,
        required: true,
    },
    alt_no: {
        type: String,
    },
    address: {
        type: String,
        trim: true
    },
    radio: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tests: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    subtotal: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "pending",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedBy: {
        type: String,
        default: "Not Completed",
    },
    comments: {
        type: String,
        default: "No Comments",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    uniq_id: {
        type: String,
        // required: true,
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        default: null,
    },
    createdBy: {
        type: String,
        default : null
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
