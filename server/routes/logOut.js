import express from 'express';
const router = express.Router();

router.post("/user", (req, res) => {
    res.clearCookie("userToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        sameSite: 'lax',
        path: '/',
        domain: isProduction ? '.visiondiagnosticscentre.com' : undefined
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