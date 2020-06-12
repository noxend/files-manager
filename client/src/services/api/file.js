import axios from 'axios';

export default {
  getFiles: async id => {
    try {
      return await axios.get('/v1/api/file', {
        params: { folderId: id }
      });
    } catch (err) {
      throw err;
    }
  },
  uploadFile: async data => {
    try {
      return await axios.post('/v1/api/file', data);
    } catch (err) {
      throw err;
    }
  },
  downloadFile: async id => {
    try {
      return await axios.post(
        '/v1/api/file/download',
        { fileId: id },
        {
          responseType: 'blob'
        }
      );
    } catch (err) {
      throw err;
    }
  },
  moveFile: async (fileId, folderId) => {
    try {
      return await axios.put('/v1/api/file/move', { fileId, folderId });
    } catch (err) {
      throw err;
    }
  }
};
