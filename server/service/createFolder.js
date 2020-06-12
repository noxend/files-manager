const {
  Folder: FolderModel,
  UserFolder: UserFolderModel
} = require('../models');

const createFolder = async ({ name, parentId, userId }) => {
  const folder = new FolderModel({
    name,
    parentId
  });

  const result = await folder.save();

  const userFolder = new UserFolderModel({
    userId,
    folderId: result[0]
  });

  await userFolder.save();

  return userFolder.fields;
};

module.exports = { createFolder };
