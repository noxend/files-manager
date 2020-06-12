const { Folder: FolderModel } = require('../models');

const { createFolder: createFolderService } = require('../service/createFolder');

const createFolder = async (req, res, next) => {
  const { name, parentId } = req.body;
  const { id: userId } = req.user;

  try {
    const result = await createFolderService({
      name,
      parentId,
      userId
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

const getFolders = async (req, res, next) => {
  const { id: userId } = req.user;
  const { parentId } = req.query;
  const { getUserFolders } = FolderModel.customMethods();

  try {
    const queryResult = await getUserFolders({ userId, parentId });
    res.send(queryResult);
  } catch (err) {
    next();
  }
};

const getRootFolder = async (req, res, next) => {
  const { id: userId } = req.user;
  const { getRootFolder: _getRootFolder } = FolderModel.customMethods();
  try {
    const queryResult = await _getRootFolder(userId);
    res.send(queryResult);
  } catch (err) {
    next(err);
  }
};

const renameFolder = async (req, res, next) => {
  const { folderId: id, name } = req.body;
  try {
    const queryResult = await FolderModel.update({ id }, { folder_name: name });
    res.json(queryResult);
  } catch (err) {
    next(err);
  }
};

const moveFolder = async (req, res, next) => {
  const { folderId, parentFolderId } = req.body;
  try {
    const result = await FolderModel.update(
      { id: folderId },
      { parent_folder_id: parentFolderId }
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRootFolder,
  createFolder,
  renameFolder,
  getFolders,
  moveFolder
};
