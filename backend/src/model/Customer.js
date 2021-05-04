const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  }
});

CustomerSchema.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('customer', CustomerSchema);
