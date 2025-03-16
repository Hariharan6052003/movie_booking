// server.js
const express = require('express');
const mongoose = require('mongoose');
const Theatre = require('./models/Theatre'); // Adjust path if needed
const Order = require('./models/Order'); // Import Order model

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hariharan:Hari%402003@cluster0.8lrqj.mongodb.net/hari3?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// API route to get theatres
app.get('/theatres', async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching theatres' });
  }
});

// Route to save an order
app.post('/orders', async (req, res) => {
  const { movie, theatre, time, selectedSeats, totalPrice, email } = req.body; // Destructure email from the request body

  // Log the request data to check if it's correct
  console.log("Order data received:", req.body);

  try {
    const newOrder = new Order({
      movie,
      theatre,
      time,
      selectedSeats,
      totalPrice,
      email // Include the email when creating a new order
    });

    await newOrder.save();
    console.log("Order saved successfully:", newOrder);
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Error saving order' });
  }
});

// server.js
app.get('/orders/:email', async (req, res) => {
  const { email } = req.params;
  console.log("Received request for orders with email:", email);

  try {
    const orders = await Order.find({ email });
    console.log("Orders found:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});



// User model for authentication
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const bcrypt = require('bcrypt');

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login route using GET
app.get('/login', async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
