const { TransformFields, createModel } = require('../libs/model');

class UserFile extends TransformFields {
  constructor({
    fileId, userId, accessId, folderId,
  }) {
    super();
    this.fields = {
      file_id: fileId,
      user_id: userId,
      access_id: accessId,
      folder_id: folderId,
    };
  }
}

module.exports = createModel('users_files', UserFile);
