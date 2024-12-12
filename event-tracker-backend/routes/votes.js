const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');

// Endpoint to handle voting
router.post('/:eventName/vote', async (req, res) => {
  const { eventName } = req.params;
  const { status, email } = req.body;

  if (!['Going', 'Not Going'].includes(status)) {
    return res.status(400).json({ error: 'Invalid vote status' });
  }

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid or missing email address' });
  }

  try {
    const newVote = new Vote({ eventName, status, email });
    await newVote.save();

    res.status(201).json({
      message: 'Vote recorded successfully',
      vote: newVote,
    });
  } catch (error) {
    console.error('Error saving vote:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
