import express from 'express';
import Test from '../models/Test.js';  // adjust path as needed

const router = express.Router();

router.get('/search/tests', async (req, res) => {
  const query = req.query.query || req.query.q;

  if (!query || query.trim().length < 3) {
    return res.status(400).json({ message: "Search query must be at least 3 characters." });
  }

  const keywords = query.toLowerCase().split(/\s+/);

  if (keywords.length === 0) {
    return res.status(400).json({ message: "No valid keywords found in search query." });
  }

  const orConditions = keywords.flatMap(word => ([
    { relevance: { $regex: new RegExp(word, "i") } },
    { name: { $regex: new RegExp(word, "i") } }
  ]));

  try {
    const results = await Test.find({ $or: orConditions }).limit(50);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

export default router;
