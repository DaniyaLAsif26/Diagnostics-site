import express from 'express';
import Package from '../models/package.js';

const router = express.Router();

router.get('/all-packages', async (req, res) => {
    try {
        const allPackages = await Package.find();
        res.json(allPackages);

    }
    catch {
        console.error("Error fetching all packages:", err);
        res.status(500).json({ message: "Failed to retrieve packages", error: err.message });
    }
})

export default router;
