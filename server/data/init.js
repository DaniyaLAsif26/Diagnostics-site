import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sampleTest, samplePack } from "./data.js";
import Test from "../models/test.js";
import Package from "../models/package.js";
import AdminPassword from "../models/adminPass.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";

main()
    .then(() => {
        console.log("connected to DB");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    try {
        await Test.deleteMany({});
        await Package.deleteMany({});
        await AdminPassword.deleteMany({});

        await Test.insertMany(sampleTest);
        await Package.insertMany(samplePack);

        const hashedPassword = await bcrypt.hash("vision@621", 10);
        await AdminPassword.create({
            username: "vision@admin",  
            password: hashedPassword
        });

        console.log("✅ Test and Package data was initialized");
    } catch (err) {
        console.error("❌ Error initializing data:", err);
    }
}
