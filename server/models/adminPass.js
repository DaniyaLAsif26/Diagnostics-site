import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminPassSchema = new Schema({
    username: {
        type : String,
        required: true,
        unique: true
    },

    password: {
        type : String,
        required: true
    }
})

const AdminPassword = mongoose.model("AdminPassword", adminPassSchema);

export default AdminPassword;