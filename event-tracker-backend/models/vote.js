const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true }, // Name of the event
    status: { type: String, enum: ['Going', 'Not Going'], required: true }, // Vote status
    email: { type: String, required: true }, // Add this field
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
