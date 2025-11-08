import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sampleTest, samplePack } from "./data.js";
import Test from "../models/test.js";
import Package from "../models/package.js";
import AdminPassword from "../models/adminPass.js";
import User from "../models/user.js";
import Report from "../models/report.js";
import Appointment from "../models/appointment.js";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../../.env") });

// const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";
const MONGO_URL = process.env.ATLAS_DB_URL;
console.log("MONGO_URL:", MONGO_URL);

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(async () => {
        console.log("connected to DB");
        await initDB();
    })
    .catch((err) => {
        console.log(err);
    });


const initDB = async () => {
    try {
        await Test.deleteMany({});
        await Package.deleteMany({});
        await AdminPassword.deleteMany({});
        await Appointment.deleteMany({});
        await User.deleteMany({});
        await Report.deleteMany({});

        await Test.insertMany(sampleTest);
        await Package.insertMany(samplePack);

        if (!process.env.ADMIN_Pass || !process.env.ADMIN_Name) {
            throw new Error("ADMIN_Name or ADMIN_Pass is missing in .env");
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_Pass, 10);
        await AdminPassword.create({
            username: process.env.ADMIN_Name,
            password: hashedPassword
        });

        console.log("✅ Test and Package data was initialized");
    } catch (err) {
        console.error("❌ Error initializing data:", err);
    }
}
