const express = require('express');
const passport = require('passport');
const { validate } = require('express-jsonschema');
const {
  User: UserModel,
  UserConfirmationLink: UserConfirmModel,
  ResetPassword: ResetPasswordModel
} = require('../models');
const { createUserSchema, authUserSchema } = require('../schemas/user');
const { userController } = require('../controllers');
const { acl: accessControl } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  validate({ body: createUserSchema }),
  userController.registration
);
router.post('/auth', validate({ body: authUserSchema }), userController.auth);
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  userController.getCurrentUser
);

router.get(
  '/confirmation/:hash',
  async (req, res, next) => {
    try {
      const result = await UserConfirmModel.selectByKey(
        'hash',
        req.params.hash
      );
      if (result.is_confirmed === 1) {
        return res.status(409).json({
          type: 'alredy-confirmed',
          message: 'Your email already confirmed!'
        });
      }
      if (new Date() > result.expired_at) {
        return res.status(409).json({
          type: 'time-expired',
          message:
            'Account verification time has expired. In your account settings, send another email to confirm your account'
        });
      }
      return next();
    } catch (err) {
      return next(err);
    }
  },
  userController.userConfirmation
);

router.post('/reset-password', userController.sendEmailResetPassword);

router.put(
  '/reset-password',
  async (req, res, next) => {
    try {
      const result = await ResetPasswordModel.selectByKey(
        'hash',
        req.body.hash
      );

      if (result.is_restored === 1) {
        return res.status(409).json({
          type: 'alredy-restored'
        });
      }
      if (new Date() > result.expired_at) {
        return res.status(409).json({
          type: 'time-expired'
        });
      }
      return next();
    } catch (err) {
      return next(err);
    }
  },
  userController.resetPassword
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      if (req.user.id === req.params.id) {
        await UserModel.updateByKey('id', req.params.id, req.body);
        res.status(200).json({ message: 'User updated' });
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await UserModel.selectByKey('id', req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  accessControl,
  async (req, res) => {
    const result = await UserModel.selectAll();
    res.status(200).json(result);
  }
);

module.exports = router;
