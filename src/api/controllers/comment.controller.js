const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const Comment = new Comment(req.body);
  Comment.user = req.user._id;

  Comment.save()
  .then((newComment) => {
    res.json(newComment);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.Comment, req.body);

  req.Comment.save()
  .then((updatedComment) => {
    res.json(updatedComment);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.Comment);
}

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: req.user._id };
  }

  Comment.find(where)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.Comment.remove(() => {
    res.json(req.Comment);
  })
  .catch(next);
}


function getCommentByID(req, res, next, id) {
  Comment.findById(id)
  .then((Comment) => {
    if (!Comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (Comment.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this Comment' });
      return;
    }

    req.Comment = Comment;
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
  getCommentByID,
};
