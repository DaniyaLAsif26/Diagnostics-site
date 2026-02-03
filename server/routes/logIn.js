import express from 'express';
const router = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import OtpSession from '../models/OtpSession.js';
import User from '../models/user.js';
import AdminPassword from '../models/adminPass.js';

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS) , false in development
    // sameSite: isProduction ? "none" : "lax",
     sameSite: 'lax', // ✅ Change from 'none'
    path: '/',
    ddomain: isProduction ? '.visiondiagnosticscentre.com' : undefined,
    maxAge: maxAge,
});

router.post("/send-otp", async (req, res) => {
    const { mobileNo } = req.body;

    if (mobileNo === '919988776655') {
        return res.status(200).json({
            Status: "Success",
            Message: "OTP sent successfully"
        });
    }

    if (!mobileNo || mobileNo.length !== 12) {
        return res.status(400).json({
            Status: "Failed",
            Message: "Invalid phone number"
        });
    }

    const API_KEY = process.env.OTP_VERIFICATION_API_KEY;
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/+${mobileNo}/AUTOGEN/Otp_verification_vision`;



    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        if (data.Status == "Success") {
            await OtpSession.findOneAndUpdate(
                { mobileNo },
                { sessionId: data.Details },
                { upsert: true, new: true }
            );
            return res.status(200).json({
                Status: "Success",
                Message: "OTP sent successfully"
            });
        }
        else {
            return res.status(200).json({
                Status: "Failed",
                Message: data.Details
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Failed",
            Message: "Internal Server Error"
        })
    }
})

router.post("/verify-otp", async (req, res) => {
    const { mobileNo, otp } = req.body;

    try {
        if (!mobileNo || mobileNo.length !== 12 || !otp || otp.length !== 6) {
            return res.status(400).json({
                data: { Status: "Failed", Details: "Invalid request" }
            });
        }

        let otpVerified = false;

        // ✅ TEST OTP (DEV ONLY)
        if (mobileNo === "919988776655" && otp === "262626") {
            otpVerified = true;
        }
        // ✅ REAL OTP
        else {
            const session = await OtpSession.findOne({ mobileNo });

            if (!session) {
                return res.status(400).json({
                    data: { Status: "Failed", Details: "Session not found" }
                });
            }

            const API_KEY = process.env.OTP_VERIFICATION_API_KEY;
            const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${session.sessionId}/${otp}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.Status === "Success" && data.Details === "OTP Matched") {
                otpVerified = true;
                await OtpSession.deleteOne({ mobileNo });
            }
        }

        if (!otpVerified) {
            res.clearCookie("userToken");
            return res.status(400).json({
                data: { Status: "Failed", Details: "Invalid OTP" }
            });
        }

        // ✅ CREATE / FETCH USER
        let user = await User.findOne({ number: mobileNo })
            .populate("reports")
            .populate("appointments");

        if (!user) {
            user = new User({ number: mobileNo });
            await user.save();
        }

        // ✅ JWT
        const userToken = jwt.sign(
            { id: user._id, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.clearCookie("userToken");
        res.cookie("userToken", userToken, getCookieOptions(7 * 24 * 60 * 60 * 1000));

        return res.status(200).json({
            data: { Status: "Success", Details: "OTP Verified" },
            user
        });

    } catch (err) {
        console.error(err);
        res.clearCookie("userToken");
        return res.status(500).json({
            data: { Status: "Failed", Details: "Internal Server Error" }
        });
    }
});

router.get("/verify/user", async (req, res) => {
    try {
        const token = req.cookies.userToken
        if (!token) return res.json({ Success: false })

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).populate('reports').populate('appointments')

        if (!user) return res.json({ Success: false })

        res.json({ Success: true, user })
    }
    catch (error) {
        console.log(error)
        res.json({ Success: false, message: "Unable to verify user" })
    }
})


//admin Login
router.post('/admin-login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminUser = await AdminPassword.findOne({ username });
        if (!adminUser) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const adminToken = jwt.sign({
            id: adminUser._id,
            role: "admin"
        },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )

        res.cookie('adminToken', adminToken, getCookieOptions(3 * 24 * 60 * 60 * 1000));

        return res.json({ success: true, message: "Login successful", adminToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get('/verify/admin', async (req, res) => {
    try {
        const token = req.cookies.adminToken
        if (!token) return res.json({ Success: false })

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role !== "admin") return res.json({ Success: false })

        res.json({ Success: true })
    }
    catch (error) {
        console.log(error)
        res.json({ Success: false })
    }
})


export default router;
