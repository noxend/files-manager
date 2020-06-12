import React from 'react';
import CustomIcon from '../Icons/CustomIcon';
import Draggable from './Draggable';

import './File.css';

const File = props => {
  const {
    type,
    fileName,
    fileSize,
    onClick,
    onDragEnd,
    onDragStart,
    onDrag
  } = props;

  const formatFileSize = (bytes, dm = 2) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(dm)} ${sizes[i]}`;
  };

  return (
    <div
      className="file"
      onClick={onClick}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
    >
      <div className="file__top">
        <div className="file__color" />
        <CustomIcon className="file__icon" type={type} />
      </div>
      <div className="file__bottom">
        <span className="file__name">{fileName}</span>
        <span className="file__size">{formatFileSize(fileSize)}</span>
      </div>
    </div>
  );
};

export default Draggable(File);
