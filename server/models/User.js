const { TransformFields, createModel } = require('../libs/model');

class UserModel extends TransformFields {
  constructor({
    email, username, password, role,
  }) {
    super();
    this.fields = {
      email,
      user_name: username,
      password,
      users_role_id: role,
    };
  }
}

module.exports = createModel('users', UserModel);
