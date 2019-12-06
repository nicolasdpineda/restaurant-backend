import express from 'express';
import restaurantCtrl from '../controllers/restaurant.controller'

import reviewRoute from '../routes/review.route'
import policies from '../policies';

const router = express.Router();

router.use(policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]));

router.route('/')
    .get(restaurantCtrl.list)
    .post([policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]), restaurantCtrl.create]);


router.route('/:restaurantID')
    .get(restaurantCtrl.read)
    .put(restaurantCtrl.update)
    .delete(restaurantCtrl.remove);

router.use('/:restaurantID/reivews', reviewRoute);


router.param('restaurantID', restaurantCtrl.getRestaurantById);

export default router;

