// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  movie: {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  theatre: {
    name: { type: String, required: true },
  },
  time: { type: String, required: true },
  selectedSeats: { type: [String], required: true }, // Array of seat numbers
  totalPrice: { type: Number, required: true },
  email: { type: String, required: true }, // Add email field
});

module.exports = mongoose.model('Order', orderSchema);
