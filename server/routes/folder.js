const express = require('express');
const passport = require('passport');

const { folderController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  folderController.getFolders
);

router.get(
  '/root',
  passport.authenticate('jwt', { session: false }),
  folderController.getRootFolder
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  folderController.createFolder
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  folderController.renameFolder
);

router.put(
  '/move',
  passport.authenticate('jwt', { session: false }),
  folderController.moveFolder
);


module.exports = router;
