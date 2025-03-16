const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  loc: { type: String, required: true },
  showtimes: [String],
});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;
