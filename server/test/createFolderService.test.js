const sinon = require('sinon');
const { assert } = require('chai');
const {
  Folder: FolderModel,
  UserFolder: UserFolderModel
} = require('../models');
const { createFolder } = require('../service/createFolder');

describe('service/createFolder.js', () => {
  it('should return object with user_id and folder_id', async () => {
    const folderModelSaveMock = sinon
      .stub(FolderModel.prototype, 'save')
      .returns(true);

    const fserFolderModelSaveMock = sinon
      .stub(UserFolderModel.prototype, 'save')
      .returns({
        userId: 1,
        folderId: 2
      });

    const result = await createFolder({
      name: 'Documents',
      parentId: 1,
      userId: 1
    });

    assert(folderModelSaveMock.calledOnce);
    assert(fserFolderModelSaveMock.calledOnce);
    assert.typeOf(result, 'object');
    assert.containsAllKeys(result, ['userId', 'folderId']);

    folderModelSaveMock.restore();
    fserFolderModelSaveMock.restore();
  });
});
