import { SchemaType, mongo } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateValidation = (rate) => (rate => 0 && rate <= 5);

const ReviewSchmea = new Schema({
  rate  : { type: Number, required: true, validate: [rateValidation, 'Rate should be between 0 - 5'] },
  text  : { type: String, required: true },
  restaurant: { type: Schema.ObjectId, ref: 'Restaurant'},
  user: { type: Schema.ObjectId, ref: 'User' },
  comment: { type: Schema.ObjectId, ref: 'Commnet'}
}, {
  timestamp: true,
});

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User'}
}, {
    timestamps: true,
})

const Review = mongoose.model('Review', ReviewSchmea);
const Commnet = mongoose.model('Commnet', CommentSchema);

export default {
    Review,
    Commnet
};