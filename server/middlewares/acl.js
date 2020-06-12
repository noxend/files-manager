const { aclConfig: acl } = require('../config');
const { UserRole: UserRoleModel } = require('../models');

module.exports = async (req, res, next) => {
  if (acl[req.originalUrl]) {
    const { name: role } = await UserRoleModel.selectFieldByKey('name', 'id', req.user.users_role_id);

    if (acl[req.originalUrl].roles.includes(role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    next();
  }
};
