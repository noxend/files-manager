import axios from 'axios';

export default {
  getFolders: async id => {
    try {
      return await axios.get('/v1/api/folder', {
        params: { parentId: id }
      });
    } catch (err) {
      throw err;
    }
  },
  getRootFolder: async () => {
    try {
      return await axios.get('/v1/api/folder/root');
    } catch (err) {
      throw err;
    }
  },
  createFolder: async (name, parentId) => {
    try {
      return await axios.post('/v1/api/folder', { name, parentId });
    } catch (err) {
      throw err;
    }
  },
  renameFolder: async (name, folderId) => {
    try {
      return await axios.put('/v1/api/folder', { name, folderId });
    } catch (err) {
      throw err;
    }
  },
  moveFolder: async (folderId, parentFolderId) => {
    try {
      return await axios.put('/v1/api/folder/move', {
        folderId,
        parentFolderId
      });
    } catch (err) {
      throw err;
    }
  }
};
