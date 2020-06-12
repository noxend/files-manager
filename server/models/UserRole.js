const { TransformFields, createModel } = require('../libs/model');

class UserRole extends TransformFields {
  constructor({
    name,
  }) {
    super();
    this.fields = {
      name,
    };
  }
}

module.exports = createModel('users_roles', UserRole);
