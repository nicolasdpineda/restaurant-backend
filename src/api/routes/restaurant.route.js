import express from 'express';
import restaurantCtrl from '../controllers/restaurant.controller'

import policies from '../policies';

const router = express.Router();

router.use(policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]));

router.route('/')
    .get(restaurantCtrl.list)
    .post([policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]), restaurantCtrl.create]);

export default router;

