import mongoose from "mongoose";
import { sampleTest, samplePack } from "./data.js";
import { Test } from "../models/test.js";
import { Package } from "../models/package.js";

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

        await Test.insertMany(sampleTest);
        await Package.insertMany(samplePack);

        console.log("✅ Test and Package data was initialized");
    } catch (err) {
        console.error("❌ Error initializing data:", err);
    }
}
