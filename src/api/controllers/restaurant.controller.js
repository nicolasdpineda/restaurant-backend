import User from "../models/user.model";
import Restaurant from '../models/restaurant.model'

import ROLES from "../constants/role";


function create(req, res, next) {
  
  const restaurant = new Restaurant({
    name: req.body.name,
  });

  restaurant.user = req.user._id;

  restaurant
    .save()
    .then(newRestaurant => {
      res.json(newRestaurant);
    })
    .catch(next);
}


function list(req, res, next) {
  let where = {};

  if (req.user.role === ROLES.OWNER) {
    where = { user: new mongoose.Types.ObjectId(req.user._id) };
  }

  Restaurant.find(where)
    .then(restaurants => {
      res.json(restaurants);
    })
    .catch(next);
}


function update(req, res, next) {
    Object.assign(req.restaurant, req.body);
  
    req.entry.save()
    .then((updatedRestaurant) => {
      res.json(updatedRestaurant);
    })
    .catch(next);
  }
  
function read(req, res) {
    res.json(req.restaurant);
}
  
function remove(req, res, next) {
    req.restaurant.remove(() => {
        res.json(req.restaurant);
    })
    .catch(next);
}
  
function getRestaurantById(req, res, next, id) {
    Restaurant.findById(id)
    .then((restaurant) => {
        if (!restaurant) {
        res.status(404).json({ message: 'restaurant' });
        return;
        }
    //   if (entry.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //     res.status(403).json({ message: 'You are not authorized to access this entry' });
    //     return;
    //   }
        req.restaurant = restaurant;
        next();
    })
    .catch(next);
}

export default {
  create,
  list,
  getRestaurantById,
  remove,
  update,
};
