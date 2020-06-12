import React from 'react';
import { Icon } from 'antd';
import { file as fileApi, folder as folderApi } from '../../../services/api';
import errorHandler from '../../../utils/errorHandler';

const Draggable = View => {
  return class extends React.Component {
    state = {
      isOver: false,
      startPosition: { x: 0, y: 0 },
      mouseStartPosition: { x: 0, y: 0 }
    };

    componentWillMount = () => {
      this.dragGhost = React.createRef();
    };

    onDragStart = e => {
      const { folderId } = this.props;
      const item = e.currentTarget.cloneNode();
      const { left, top } = e.currentTarget.getBoundingClientRect();
      e.dataTransfer.setDragImage(item, 0, 0);
      e.dataTransfer.setData('folderId', folderId);
      e.target.classList.add('--hold-folder');
      localStorage.folderId = folderId;
      setTimeout(() => {
        this.dragGhost.current.classList.toggle('--move');
      }, 0);
      this.dragGhost.current.style.opacity = 1;
      this.setState({
        startPosition: {
          x: e.currentTarget.offsetLeft,
          y: e.currentTarget.offsetTop
        },
        mouseStartPosition: {
          x: left,
          y: top
        }
      });
    };

    setPosition = (x, y) => {
      this.dragGhost.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    onDragEnd = e => {
      e.target.classList.remove('--hold-folder');
      localStorage.removeItem('folderId');
      this.setPosition(this.state.startPosition.x, this.state.startPosition.y);
      this.dragGhost.current.style.opacity = 0;
      setTimeout(() => {
        this.dragGhost.current.classList.toggle('--move');
      }, 300);
    };

    onDrop = e => {
      const { folderId: currentFolderId, getFiles, getFolders } = this.props;
      const fileId = e.dataTransfer.getData('fileId');
      const folderId = e.dataTransfer.getData('folderId');
      if (folderId) {
        if (parseInt(localStorage.folderId) !== currentFolderId) {
          folderApi
            .moveFolder(folderId, currentFolderId)
            .then(() => {
              getFolders();
            })
            .catch(errorHandler);
        }
      } else {
        fileApi
          .moveFile(fileId, currentFolderId)
          .then(() => {
            getFiles();
          })
          .catch(errorHandler);
      }
      e.target.classList.replace('folder-button--over', 'folder-button');
      this.setState({
        isOver: false
      });
    };

    onDragLeave = e => {
      e.target.classList.replace('folder-button--over', 'folder-button');
      this.setState({
        isOver: false
      });
    };

    onDragEnter = e => {
      const { folderId } = this.props;
      if (localStorage.folderId) {
        if (parseInt(localStorage.folderId) !== folderId) {
          e.target.classList.replace('folder-button', 'folder-button--over');
          this.setState({
            isOver: true
          });
        }
      } else {
        e.target.classList.replace('folder-button', 'folder-button--over');
        this.setState({
          isOver: true
        });
      }
    };

    onDragOver = e => {
      e.preventDefault();
    };

    onDrag = e => {
      const { x, y } = this.state.mouseStartPosition;

      if (
        e.clientX + this.dragGhost.current.offsetWidth + 5 >=
        document.body.offsetWidth
      ) {
        this.setPosition(
          e.clientX - x - this.dragGhost.current.offsetWidth - 5,
          e.clientY - y + 5
        );
      } else {
        this.setPosition(e.clientX - x + 5, e.clientY - y + 5);
      }
    };

    render = () => {
      return (
        <div style={{ position: 'relative' }}>
          <View {...this.props} {...this} />
          <div ref={this.dragGhost} className="drag-ghost">
            <Icon
              type="folder"
              style={{ fontSize: '18px', marginRight: '8px' }}
            />
            <span>{this.props.title}</span>
          </div>
        </div>
      );
    };
  };
};

export default Draggable;
