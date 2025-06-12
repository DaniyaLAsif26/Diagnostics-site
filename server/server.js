import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import testRoutes from "./routes/searchTests.js";
import packageRoutes from "./routes/searchPackages.js";
import searchRoutes from './routes/searchResults.js';
import homePopularRoutes from './routes/homePopular.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";
mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));

app.use("/api", testRoutes);
app.use("/api", packageRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/home', homePopularRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});