const mongoose = require('mongoose');
const BugSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Bug', BugSchema);