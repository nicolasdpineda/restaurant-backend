const express = require('express');
const entryCtrl = require('../controllers/entry.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
router.use(policies.checkRoles([ROLES.ADMIN, ROLES.USER]));

router.route('/')
  .get(entryCtrl.list)
  .post(entryCtrl.create);

router.param('entryId', entryCtrl.getEntryByID);

module.exports = router;
