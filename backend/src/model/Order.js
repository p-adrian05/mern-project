const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  created: { type: Date, default: Date.now },
  notes: [
    {
      required: false,
      name: { type: String, required: true },
      started: { type: Date, default: Date.now },
      finished: { type: Date, default: null },
      comments: [{ body: String, date: { type: Date, default: Date.now } }],
      images: [
        { path: String }
      ]
    }
  ],
  contact_data: {
    zip_code: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    street_number: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    }
  }
});

OrderSchema.pre('findOneAndUpdate', next => {
  console.log('pre update hook');
  next();
});

module.exports = mongoose.model('order', OrderSchema);
