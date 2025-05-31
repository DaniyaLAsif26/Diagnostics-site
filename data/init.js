import mongoose from "mongoose";
import initData from "./data.js";
import Test from "../models/Test.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";

main()
    .then(() => {
        console.log("connected to DB");
        initDB(); // move this here to ensure DB is connected
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Test.deleteMany({});
    let modifiedData = initData.map((obj) => obj); // or add owner if needed
    await Test.insertMany(modifiedData);
    console.log("data was initialized");
};
