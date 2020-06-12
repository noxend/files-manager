const { TransformFields, createModel } = require('../libs/model');

class UserConfirmationLink extends TransformFields {
  constructor({
    userId, hash, isConfirmed, expiredAt
  }) {
    super();
    this.fields = {
      user_id: userId,
      is_confirmed: isConfirmed,
      hash,
      expired_at: expiredAt 
    };
  }
}

module.exports = createModel('user_confirmation_link', UserConfirmationLink);
