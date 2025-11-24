import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AdminPassword from '../models/adminPass.js';

//Helper function
const verifyTokenFromCookies = (req, tokenName) => {
    const token = req.cookies?.[tokenName];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
}

const allowUserOrAdmin = async (req, res, next) => {
    try {
        let decoded = verifyTokenFromCookies(req, 'adminToken');
        if (decoded && decoded.role === 'admin') {
            const admin = await AdminPassword.findById(decoded.id);

            if (admin) {
                req.user = {
                    id: admin._id,
                    role: 'admin'
                };
                return next();
            }
        }

        decoded = verifyTokenFromCookies(req, 'userToken');
        if (decoded && decoded.role === 'user') {
            const user = await User.findById(decoded.id);

            if (user) {
                req.user = {
                    id: user._id,
                    role: 'user'
                };
                return next();
            }
        }
        return res.status(401).json({ message: "Unauthorized access" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error during authentication" });
    }
}

const AllowAdmin = async (req, res, next) => {
    try {
        let decoded = verifyTokenFromCookies(req, "adminToken")
        if (decoded && decoded.role === 'admin') {
            const admin = await AdminPassword.findById(decoded.id)
            if (admin) {
                req.user = {
                    id: admin._id,
                    role: "admin"
                }
                return next();
            }
        }
        return res.status(401).json({ message: "Unauthorized access" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server error during authentication" });
    }
}

export {allowUserOrAdmin, AllowAdmin };