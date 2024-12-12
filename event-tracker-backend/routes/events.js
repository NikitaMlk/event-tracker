const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Vote = require('../models/vote');
const nodemailer = require('nodemailer');

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Fetch a single event by its ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const goingVotes = await Vote.aggregate([
      { $match: { eventName: event.title, status: 'Going' } },
      { $group: { _id: '$eventName', count: { $sum: 1 } } }
    ]);

    const goingCount = goingVotes.length > 0 ? goingVotes[0].count : 0;

    event.goingCount = goingCount;
    await event.save();

    res.json({
      ...event.toObject(),
      goingCount
    });

  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).send('Server error');
  }
});

router.post('/events/goingCount', async (req, res) => {
  const { eventIds } = req.body;

  if (!Array.isArray(eventIds) || eventIds.length === 0) {
    return res.status(400).json({ error: "Event IDs must be provided as an array." });
  }

  const invalidIds = eventIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    return res.status(400).json({ error: `Invalid event IDs: ${invalidIds.join(', ')}` });
  }

  try {
    const events = await Event.find({ '_id': { $in: eventIds } });

    if (events.length === 0) {
      return res.status(404).send("No events found");
    }

    const goingCounts = events.map(event => ({
      eventId: event._id,
      goingCount: event.goingCount
    }));

    res.json(goingCounts);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
