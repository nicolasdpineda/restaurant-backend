import express from 'express';
import reviewCtrl from '../controllers/review.controller'

import policies from '../policies';

const router = express.Router();

//router.use(policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]));

router.route('/')
    .get(reviewCtrl.list)
    .post([policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]), reviewCtrl.create]);


router.route('/:reviewID')
    .get(reviewCtrl.read)
    .put(reviewCtrl.update)
    .delete(reviewCtrl.remove);

router.param('reviewID', reviewCtrl.getReviewByID);

export default router;

