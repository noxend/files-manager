const knex = require('../knex');
const { TransformFields, createModel } = require('../libs/model');

class FileModel extends TransformFields {
  constructor({ name, originalName, size }) {
    super();
    this.fields = {
      original_name: originalName,
      file_name: name,
      file_size: size
    };
  }

  static async getUserFiles(folderId) {
    const result = await knex
      .select(
        'files.id as fileId',
        'original_name as fileName',
        'file_size as fileSize',
        'files.created_at as createdAt'
      )
      .from('users_files')
      .join('files', 'files.id', 'users_files.file_id')
      .where('users_files.folder_id', '=', folderId);

    return result;
  }
}

module.exports = createModel('files', FileModel);
