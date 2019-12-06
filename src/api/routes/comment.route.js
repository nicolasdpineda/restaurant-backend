import express from 'express';
import commentCtrl from '../controllers/comment.controller'

import policies from '../policies';

const router = express.Router();

//router.use(policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]));

router.route('/')
    .get(commentCtrl.list)
    .post([policies.checkRoles([ROLES.ADMIN, ROLES.OWNER]), commentCtrl.create]);


router.route('/:commentID')
    .get(commentCtrl.read)
    .put(commentCtrl.update)
    .delete(commentCtrl.remove);

router.param('commentID', commentCtrl.getCommentByID);

export default router;

