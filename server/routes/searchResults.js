import express from 'express';
import Test from '../models/test.js';
import Package from '../models/package.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim().length < 3) {
    return res.status(400).json({ message: "Search query must be at least 3 characters." });
  }

  const keywords = query.toLowerCase().split(/\s+/);

  const orConditions = keywords.flatMap(word => ([
    { name: { $regex: new RegExp(word, "i") } },
    { relevance: { $elemMatch: { $regex: new RegExp(word, "i") } } },
    { tests: { $elemMatch: { $regex: new RegExp(word, "i") } } }  // added this line
  ]));

  try {
    const [tests, packages] = await Promise.all([
      Test.find({ $or: orConditions }).limit(50),
      Package.find({ $or: orConditions }).limit(50)
    ]);

    res.json({ tests, packages });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});




export default router;
