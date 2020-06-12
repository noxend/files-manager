const express = require('express');
const passport = require('passport');
const upload = require('../service/multer');

const { fileController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  fileController.getFiles
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('file'),
  fileController.uploadFile
);
router.post(
  '/download',
  passport.authenticate('jwt', { session: false }),
  fileController.downloadFile
);
router.put(
  '/move',
  passport.authenticate('jwt', { session: false }),
  fileController.moveFile
);

module.exports = router;
