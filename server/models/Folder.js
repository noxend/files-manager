const knex = require('../knex');
const { TransformFields, createModel } = require('../libs/model');

class FolderModel extends TransformFields {
  constructor({ name, parentId }) {
    super();
    this.fields = {
      folder_name: name,
      parent_folder_id: parentId
    };
  }

  static async getUserFolders({ userId, parentId }) {
    const result = await knex
      .select(
        'folders.id as folderId',
        'folders.folder_name as folderName',
        'folders.parent_folder_id as parentId'
      )
      .from('users_folders')
      .join('folders', 'folders.id', 'users_folders.folder_id')
      .where('users_folders.user_id', '=', userId)
      .where('folders.parent_folder_id', '=', parentId);

    return result;
  }

  static async getRootFolder(userId) {
    try {
      const result = await knex
        .select('folders.id as folderId', 'folders.folder_name as folderName')
        .from('users_folders')
        .join('folders', 'folders.id', 'users_folders.folder_id')
        .where('users_folders.user_id', '=', userId)
        .whereNull('folders.parent_folder_id');

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = createModel('folders', FolderModel);
