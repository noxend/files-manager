const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createFolder } = require('../service/createFolder');
const { Emails } = require('../service/emails');
const {
  UserRole: UserRoleModel,
  User: UserModel,
  UserConfirmationLink: UserConfirmModel,
  ResetPassword: ResetPasswordModel
} = require('../models');

const registration = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const isUserExists = await UserModel.selectByKey({ email });

    if (!isUserExists) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const user = new UserModel({
        email,
        username,
        password: hashPass,
        role: await UserRoleModel.getIdByKey('name', 'user')
      });
      const saveResult = await user.save();

      const emails = new Emails();

      await emails.sendWelcomeEmail({
        to: email,
        data: {
          username
        }
      });

      const rootFolderName = `${username[0].toUpperCase()}${username.slice(
        1
      )}'s Files`;

      await createFolder({
        name: rootFolderName,
        parentId: null,
        userId: saveResult[0]
      });

      delete user.fields.password;
      res.status(200).json(user.fields);
    } else {
      res.status(409).json({ message: 'This email already exists' });
    }
  } catch (err) {
    next(err);
  }
};

const auth = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userData = await UserModel.selectByKey('email', email);

    if (userData) {
      const passwordResult = await bcrypt.compare(password, userData.password);

      if (passwordResult) {
        const token = jwt.sign(
          {
            id: userData.id
          },
          process.env.JWT_KEY,
          { expiresIn: 3600 }
        );

        res.status(200).json({ token: `Bearer ${token}` });
      } else {
        res.status(409).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserModel.selectByKey('id', req.user.id);
    const role = await UserRoleModel.selectFieldByKey(
      'name',
      'id',
      user.users_role_id
    );
    res.send({
      id: user.id,
      email: user.email,
      name: user.user_name,
      role: role.name
    });
  } catch (err) {
    next(err);
  }
};

const userConfirmation = async (req, res, next) => {
  try {
    await UserConfirmModel.update(
      { hash: req.params.hash },
      { is_confirmed: 1 }
    );
    return res.status(200).json({
      type: 'confirmed',
      message: 'Your account confirmed. Thank you!'
    });
  } catch (err) {
    return next(err);
  }
};

const sendEmailResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emails = new Emails();

    await emails.sendResetPasswordEmail({
      to: email,
      data: {}
    });

    return res.status(200).json({
      type: 'confirmed',
      message: 'Your account confirmed. Thank you!'
    });
  } catch (err) {
    return next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, hash } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const result = await ResetPasswordModel.selectByKey('hash', hash);
    await UserModel.update({ id: result.user_id }, { password: hashPass });
    await ResetPasswordModel.update({ hash }, { is_restored: 1 });

    return res.status(200).json({
      type: 'password changed',
      message: 'Password changed'
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  auth,
  registration,
  resetPassword,
  getCurrentUser,
  userConfirmation,
  sendEmailResetPassword
};
