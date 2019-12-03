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

  Restaurant.find(where)
    .then(restaurants => {
      res.json(restaurants);
    })
    .catch(next);

}

export default {
  create,
  list,
};
