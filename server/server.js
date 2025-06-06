import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import testRoutes from "./routes/searchTests.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";
mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));

app.use("/api/search", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// At the end of your Express app setup:
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});