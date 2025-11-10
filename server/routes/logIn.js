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
    secure: isProduction, // true in production (HTTPS), false in development
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin, "lax" for same-origin
    maxAge: maxAge,
});

router.post("/send-otp", async (req, res) => {
    const { mobileNo } = req.body;

    if (!mobileNo || mobileNo.length !== 12) {
        return res.status(400).json({
            Status: "Failed",
            Message: "Invalid phone number"
        });
    }

    const API_KEY = process.env.OTP_VERIFICATION_API_KEY;
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/+${mobileNo}/AUTOGEN2`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
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
                Status: "Failed",
                Message: "Invalid request"
            })
        }

        const sessionId = await OtpSession.findOne({ mobileNo })

        if (!sessionId) {
            return res.status(400).json({
                Status: "Failed",
                Message: "Session not found"
            })
        }

        const API_KEY = process.env.OTP_VERIFICATION_API_KEY;
        // console.log("\n sessionId", sessionId.sessionId);
        // console.log(`\n https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY2/${sessionId.sessionId}/${otp}`)
        // const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY2/${sessionId.sessionId}/${otp}`
        const url = "https://2factor.in/API/V1/your-api-key/SMS/VERIFY/Dummy-12345/12345"
        const response = await fetch(url, {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);

        if (data.Status === "Success" && data.Details === "OTP Matched") {
            await OtpSession.deleteOne({ mobileNo });

            let user = await User.findOne({ number: Number(mobileNo) });
            if (!user) {
                user = new User({ number: Number(mobileNo) });
                await user.save();
            }

            const userToken = jwt.sign({
                id: user._id,
                phoneNumber: mobileNo
            },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie("usertoken", userToken, getCookieOptions(7 * 24 * 60 * 60 * 1000))
            return res.status(200).json({ data, user })
        }
        else {
            return res.status(400).json({
                Status: "Failed",
                Message: "Invalid OTP"
            })
        }
    }
    catch (err) {
        console.log("verify OTp error", err);
        return res.status(500).json({
            Status: "Failed",
            Message: "Internal Server Error"
        })
    }
})

router.get("/verify/user", async (req, res) => {
    try {
        const token = req.cookies.usertoken
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
    console.log(isProduction)
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
