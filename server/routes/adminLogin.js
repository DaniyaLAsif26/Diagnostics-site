import express from 'express';
import bcrypt from "bcryptjs";
import AdminPassword from '../models/adminPass.js';

const router = express.Router();

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

        return res.json({ success: true, message: "Login successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
