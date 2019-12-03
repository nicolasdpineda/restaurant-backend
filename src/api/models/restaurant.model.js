const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positiveNumber = (distance) => distance > 0;

const Restaurant = new Schema({
  date: {
    type: Date,
  },
  rate: {
    type: Number,
    default: 0,
    validate: [positiveNumber, 'Rate should be bigger than 00:00'],
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Entry', EntrySchema);
