const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  age: String,
  batch: String,
  month: String,
  payment: String
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;