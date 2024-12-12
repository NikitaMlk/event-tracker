const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  category: { type: String },
  going: { type: Number, default: 0 },
  notGoing: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
