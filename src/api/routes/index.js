import express from 'express';
import expressJwt from'express-jwt';

import config from '../../config';

import authRoute from './auth.route';
//const entryRoute = require('./entry.route');
import userRoute from './user.route';
import restaurantRoute from './restaurant.route'
//const profileRoute = require('./profile.route');

const router = express.Router();

const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
//router.use('/entries', authMiddleware, entryRoute);
router.use('/users', authMiddleware, userRoute);
router.use('/restaurants', authMiddleware, restaurantRoute);

//router.use('/profile', authMiddleware, profileRoute);

export default router;
