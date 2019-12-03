import express from'express';

import userCtrl from '../controllers/user.controller';

import ROLES from '../constants/role';
import policies from '../policies';

const router = express.Router();

router.use(policies.checkRoles([ROLES.ADMIN]));

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param('userId', userCtrl.getUserByID);

export default router;
