import express from 'express';
import Package from '../models/package.js';

const router = express.Router();

router.get('/all-packages', async (req, res) => {
    try {
        const allPackages = await Package.find();
        res.json({
            success: true,
            packs: allPackages
        });
    }
    catch {
        console.error("Error fetching all packages:", err);
        res.status(500).json({ message: "Failed to retrieve packages", error: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pack = await Package.findById(id);

        if (!pack) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            })
        }

        return res.json({
            success: true,
            pack: pack

        })
    }
    catch {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `Server Error , ${err.message}`
        })
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        if (!data.name || !data.relevance || !data.relevance || !data.price) {
            return res.json({
                success: false,
                message: "Incomplete Fields"
            })
        }

        const updatePack = await Package.findByIdAndUpdate(
            id,
            data,
            {
                runValidators: true,
            }
        )

        if (!updatePack) {
            return res.json({
                success: false,
                message: "Error updating Package"
            })
        }

        return res.json({
            success: true,
            message: "Package Updated Successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            succcess: false,
            message: err.message
        })
    }
})

export default router;
