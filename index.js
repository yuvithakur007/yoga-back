const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://yuvi:1234qwer@cluster0.welgx2d.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Model
const Enrollee = mongoose.model('Enrollee', new mongoose.Schema({
  name: String,
  age: Number,
  batch: String,
}));

// Routes
app.post('/enroll', async (req, res) => {
  try {
    const { name, age, batch } = req.body;
    if (age < 18 || age > 65) {
      return res.status(400).send('Invalid age');
    }

    const newEnrollee = new Enrollee({ name, age, batch });
    await newEnrollee.save();

    // Call the CompletePayment function (mocked for now)
    const paymentResponse = { success: true, message: 'Payment successful' };
    res.send(paymentResponse);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
