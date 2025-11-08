import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import testRoutes from "./routes/searchTests.js";
import packageRoutes from "./routes/searchPackages.js";
import searchRoutes from './routes/searchResults.js';
import homePopularRoutes from './routes/homePopular.js';
import saveAppointmentRoute from './routes/saveAppointment.js';
import showAppointmentRoute from './routes/showAppointments.js';
import loginRoute from './routes/logIn.js';
import logOutRoute from './routes/logOut.js';
import UserRoute from './routes/User.js';
import ReportRoute from './routes/UploadReports.js'

const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

import dotenv from "dotenv";
dotenv.config();

import compression from 'compression';
import helmet from 'helmet';
app.use(helmet());
app.use(compression());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "https://your-vercel-url.vercel.app", "https://visiondiagnosticscentre.com/"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// app.use(cors())

// const MONGO_URL = "mongodb://127.0.0.1:27017/vision-center";
const MONGO_URL = process.env.ATLAS_DB_URL;
mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));

app.use("/api", testRoutes);
app.use("/api", packageRoutes);
app.use("/api", showAppointmentRoute);
app.use('/api/user', UserRoute);
app.use('/api/report', ReportRoute);
app.use('/api/login', loginRoute);
app.use('/api/logout', logOutRoute);
app.use('/api/save', saveAppointmentRoute);
app.use('/api/search', searchRoutes);
app.use('/api/home', homePopularRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
