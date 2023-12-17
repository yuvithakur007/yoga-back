const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const Form = require('./form.js');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.post('/enroll', async (req, res) => {
    try {
      const { name, age, batch, month, payment } = req.body;
      if (parseInt(age) < 18 || parseInt(age) > 65) {
        return res.status(400).send('Invalid age');
      }
  
      const newForm = new Form({ name, age, batch, month, payment });
      await newForm.save();
  
      // Call the CompletePayment function and handle the response
      const paymentResponse = CompletePayment({ /* user and payment details */ });
  
      // Check the payment response and return appropriate response to frontend
      if (paymentResponse.success) {
        res.status(200).send({ message: 'Enrollment and payment successful' });
      } else {
        res.status(400).send({ message: 'Payment failed', details: paymentResponse });
      }
  
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function CompletePayment(details) {
  // Simulate a payment response
  return { success: true, message: 'Payment successful' };
}