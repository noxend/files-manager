import React from 'react';
import { Typography, Icon, Dropdown, Menu, Tooltip } from 'antd';
import Draggable from './Draggable';

import './FolderButton.css';

const { Text } = Typography;

const FolderButton = props => {
  const {
    title,
    onClickEditIcon,
    onClickFolderButton,
    onDrop,
    onDrag,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDragStart,
    onDragEnd,
    state: { isOver }
  } = props;

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onClickEditIcon}>
        <Icon type="edit" /> Rename
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        onDrag={onDrag}
        className="folder-button"
        onClick={onClickFolderButton}
        draggable={true}
      >
        <Icon
          type={isOver ? 'folder-open' : 'folder'}
          theme="twoTone"
          className="folder-button__icon"
        />
        <Tooltip placement="topLeft" title={title} mouseEnterDelay={0.7}>
          <Text strong className="folder-button__title">
            {title}
          </Text>
        </Tooltip>
      </div>
    </Dropdown>
  );
};

export default Draggable(FolderButton);
