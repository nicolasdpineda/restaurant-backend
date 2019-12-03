const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateValidation = (rate) => (rate => 0 && rate <= 5);

const RestaurnatShema = new Schema({
  name  : { type: String, required: true },
  user  : { type: Schema.ObjectId,  ref: 'User' },
}, {
  timestamp: true,
});


const ReviewSchmea = new Schema({
  rate  : { type: Number, required: true, validate: [rateValidation, 'Rate should be between 0 - 5'] },
  comment : { type: String, required: true },
  restaurant: { type: Schema.ObjectId, ref: 'Restaurant'},
  user: { type: Schema.ObjectId, ref: 'User' },
}, {
  timestamp: true,
});


const Restaurant = mongoose.model('Restaurant', RestaurnatShema);
const Review = mongoose.model('Review', ReviewSchmea );

export default { 
  Restaurant,
  Review
}