const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateValidation = (rate) => (rate => 0 && rate <= 5);

const ReviewSchmea = new Schema({
  rate  : { type: Number, required: true, validate: [rateValidation, 'Rate should be between 0 - 5'] },
  comment : { type: String, required: true },
  restaurant: { type: Schema.ObjectId, ref: 'Restaurant'},
  user: { type: Schema.ObjectId, ref: 'User' },
}, {
  timestamp: true,
});


export default mongoose.model('Review', ReviewSchmea );
