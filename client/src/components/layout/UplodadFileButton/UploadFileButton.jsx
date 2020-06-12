import React from 'react';
import { Typography, Icon } from 'antd';

import './UploadFileButton.css';

const { Text } = Typography;

const UploadFileButton = () => {
  return (
    <div className="upload-file">
      <Icon type="file-add" className="upload-file__icon" />
    </div>
  );
};

export default UploadFileButton;
