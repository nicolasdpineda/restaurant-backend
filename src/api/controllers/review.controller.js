const mongoose = require('mongoose');
const Review = require('../models/Review.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const Review = new Review(req.body);
  Review.user = req.user._id;

  Review.save()
  .then((newReview) => {
    res.json(newReview);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.Review, req.body);

  req.Review.save()
  .then((updatedReview) => {
    res.json(updatedReview);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.Review);
}

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: req.user._id };
  }

  Review.find(where)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.Review.remove(() => {
    res.json(req.Review);
  })
  .catch(next);
}

function getReviewByID(req, res, next, id) {
  Review.findById(id)
  .then((Review) => {
    if (!Review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    if (Review.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this Review' });
      return;
    }

    req.Review = Review;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getReviewByID,
};
