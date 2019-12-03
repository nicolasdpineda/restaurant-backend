const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateValidation = (rate) => (rate >= 0 && rate <= 5);

const RestaurnatShema = new Schema({
  name  : { type: String, required: true },
  user  : { type: Schema.ObjectId,  ref: 'User' },
}, {
  timestamp: true,
});


export default mongoose.model('Restaurant', RestaurnatShema);