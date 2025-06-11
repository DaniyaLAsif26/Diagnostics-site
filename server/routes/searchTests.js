import express from 'express';
import Test from '../models/test.js';

const router = express.Router();


router.get('/all-tests', async (req, res) => {
  try {
    const allTests = await Test.find();
    res.json(allTests);

  }
  catch (err) {
    console.error("Error fetching all tests:", err);
    res.status(500).json({ message: "Failed to retrieve tests", error: err.message });
  }

})

export default router;
