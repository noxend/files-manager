const { TransformFields, createModel } = require('../libs/model');

class UserFolders extends TransformFields {
  constructor({
    folderId, userId
  }) {
    super();
    this.fields = {
      folder_id: folderId,
      user_id: userId
    };
  }
}

module.exports = createModel('users_folders', UserFolders);
