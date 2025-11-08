import express from 'express';
import Test from '../models/test.js';
import Package from '../models/package.js';

const router = express.Router();

router.get("/popular-tests-packs", async (req, res) => {
    try {
        const [tests, packages] = await Promise.all([
            Test.find({popular : true}).limit(3),
            Package.find().limit(3)
        ]);
        res.json({ tests, packages });
    } catch {
        console.error("Error fetching all packages:", err);
        res.status(500).json({ message: "Failed to retrieve packages", error: err.message });
    }
})

export default router;