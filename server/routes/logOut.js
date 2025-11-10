import express from 'express';
const router = express.Router();

router.post("/user", (req, res) => {
    res.clearCookie("usertoken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.json({ Success: true })
})

router.post('/admin', (req, res) => {
    res.clearCookie("adminToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ Success: true })
})

export default router