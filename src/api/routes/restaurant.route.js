import express from 'express';
import restaurantCtrl from '../controllers/restaurant.controller'

const router = express.Router();

router.route('/')
  .get(restaurantCtrl.list)
  .post(restaurantCtrl.create);

export default router;
