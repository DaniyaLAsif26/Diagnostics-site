import express from 'express';
import Test from '../models/test.js';

const router = express.Router();


router.get('/laboratory', async (req, res) => {
  try {
    const allTests = await Test.find({ category: 'Laboratory' });
    res.json({
      success: true,
      tests: allTests
    });

  }
  catch (err) {
    console.error("Error fetching all tests:", err);
    res.status(500).json({ message: "Failed to retrieve tests", error: err.message });
  }

})

router.get('/radiology', async (req, res) => {
  try {
    const allTests = await Test.find({ category: 'Radiology' });
    res.json({
      success: true,
      tests: allTests
    });

  }
  catch (err) {
    console.error("Error fetching all tests:", err);
    res.status(500).json({ message: "Failed to retrieve tests", error: err.message });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found"
      })
    }

    return res.json({
      success: true,
      test: test
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

    if (!data.name || !data.category || !data.relevance || !data.price) {
      return res.json({
        success: false,
        message: "Incomplete Fields"
      })
    }

    const updateTest = await Test.findByIdAndUpdate(
      id,
      data,
      {
        runValidators: true,
      }
    )

    if (!updateTest) {
      return res.json({
        success: false,
        message: "Error updating test"
      })
    }

    return res.json({
      success: true,
      message: "Test Updated Successfully"
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
