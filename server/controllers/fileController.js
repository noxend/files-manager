const path = require('path');

const { File: FileModel, UserFile: UserFileModel } = require('../models');

const uploadFile = async (req, res, next) => {
  const { originalname, filename, size } = req.file;
  const { id: userId } = req.user;
  const { folderId } = req.body;

  try {
    const file = new FileModel({
      name: filename,
      originalName: originalname,
      size
    });
    const saveResult = await file.save();

    const userFile = new UserFileModel({
      fileId: saveResult[0],
      userId,
      accessId: 1,
      folderId
    });

    await userFile.save();

    res.send(userFile.fields);
  } catch (err) {
    next(err);
  }
};

const getFiles = async (req, res, next) => {
  const { folderId } = req.query;
  const { getUserFiles } = FileModel.customMethods();

  try {
    const queryResult = await getUserFiles(folderId);
    res.send(queryResult);
  } catch (err) {
    next(err);
  }
};

const downloadFile = async (req, res, next) => {
  const { fileId } = req.body;
  try {
    const result = await FileModel.selectByKey('id', fileId);
    const filePath = `${path.join(__dirname, '../uploads/')}${
      result.file_name
    }`;
    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

const moveFile = async (req, res, next) => {
  const { fileId, folderId } = req.body;
  try {
    const result = await UserFileModel.update(
      { file_id: fileId },
      { folder_id: folderId }
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
  getFiles,
  downloadFile,
  moveFile
};
