const { TransformFields, createModel } = require('../libs/model');

class ResetPassword extends TransformFields {
  constructor({
    userId, hash, isRestored, expiredAt
  }) {
    super();
    this.fields = {
      user_id: userId,
      is_restored: isRestored,
      hash,
      expired_at: expiredAt 
    };
  }
}

module.exports = createModel('reset_password', ResetPassword);
