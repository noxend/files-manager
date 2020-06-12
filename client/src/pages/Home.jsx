import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography, Icon, Button } from 'antd';

import errorHandler from '../utils/errorHandler';
import { file, folder } from '../services/api';

import {
  SideNavigation,
  SideNavigationItem
} from '../components/layout/SideNavigation';
import LineLoader from '../components/layout/LineLoader';
import { File, FileSkeleton } from '../components/layout/File';
import {
  FolderButton,
  FolderButtonSkeleton
} from '../components/layout/FolderButton';
import InputModal from '../components/layout/InputModal';

const { Title, Text } = Typography;

class Home extends React.Component {
  state = {
    files: [],
    folders: [],
    title: null,
    folderName: '',
    currentFolder: null,
    isFilesLoaded: false,
    selectedFolder: null,
    renameFolderValue: '',
    foldersNavigation: [],
    isModalVisible: false,
    isFoldersLoaded: false,
    flagForLineLoader: true,
    isRootFolderLoaded: false,
    isRenameModalVisible: false,
    currentPage: this.props.match.path
  };

  componentDidMount = () => {
    const { userReducer } = this.props;
    document.title = 'Files Manager';
    if (userReducer.isAuthenticated) {
      this.getRootFolder();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { foldersNavigation, currentFolder } = this.state;

    if (
      currentFolder !== prevState.currentFolder &&
      foldersNavigation.length !== 0
    ) {
      this.getFolders(
        foldersNavigation[foldersNavigation.length - 1].id,
        foldersNavigation[foldersNavigation.length - 1].title
      );
    }
  };

  getFiles = async folderId => {
    this.setState({
      flagForLineLoader: false
    });
    try {
      const { data } = await file.getFiles(folderId);
      this.setState({
        files: data,
        isFilesLoaded: true,
        flagForLineLoader: true
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  getRootFolder = async () => {
    try {
      const { data } = await folder.getRootFolder();
      this.getFolders(data[0].folderId, data[0].folderName);
      this.setState({
        isRootFolderLoaded: true
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  updateFolders = async () => {
    const { foldersNavigation } = this.state;
    const id = foldersNavigation[foldersNavigation.length - 1].id;
    this.setState({
      flagForLineLoader: false
    });
    try {
      const { data } = await folder.getFolders(id);
      this.setState({
        folders: data,
        flagForLineLoader: true
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  getFolders = async (id, title) => {
    const { foldersNavigation } = this.state;
    try {
      const { data } = await folder.getFolders(id);
      this.setState(
        {
          folders: data,
          title,
          currentFolder: id,
          isFoldersLoaded: true,
          foldersNavigation: this.pushInArr(foldersNavigation, {
            id,
            title
          })
        },
        () => this.getFiles(this.state.currentFolder)
      );
    } catch (err) {
      errorHandler(err);
    }
  };

  uploadFile = async e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('folderId', this.state.currentFolder);
    e.target.value = null;
    try {
      await file.uploadFile(formData);
      this.getFiles(this.state.currentFolder);
    } catch (err) {
      errorHandler(err);
    }
  };

  foldersNavigation = id => {
    const { foldersNavigation } = this.state;
    const index = foldersNavigation.findIndex(el => el.id === id);
    const splice = (arr, index) => {
      arr.splice(index + 1);
      return arr;
    };
    const newArr = splice(foldersNavigation, index);
    this.setState({
      foldersNavigation: newArr,
      currentFolder: newArr[newArr.length - 1].id
    });
  };

  backFolder = () => {
    const removeLastItem = arr => {
      arr.pop();
      return arr;
    };
    const newArr = removeLastItem(this.state.foldersNavigation);
    this.setState({
      foldersNavigation: newArr,
      currentFolder: newArr[newArr.length - 1].id
    });
  };

  pushInArr = (arr, value) => {
    let flag = true;
    for (let i in arr) {
      if (Object.values(arr[i]).includes(value.id)) {
        flag = false;
        return arr;
      }
    }
    if (flag) {
      arr.push(value);
      return arr;
    }
  };

  onModalOk = async () => {
    const { folderName, currentFolder } = this.state;
    this.toggleModal();
    this.setState({
      flagForLineLoader: false
    });

    try {
      await folder.createFolder(folderName, currentFolder);
      const { data } = await folder.getFolders(currentFolder);
      this.setState({
        folders: data,
        flagForLineLoader: true
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  onModalCancel = () => {
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      folderName: ''
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onRenameFolder = (name, id) => {
    this.setState(
      {
        selectedFolder: id,
        renameFolderValue: name
      },
      this.onRenameFolderToggle()
    );
  };

  onRenameFolderOk = async () => {
    const { renameFolderValue, selectedFolder, currentFolder } = this.state;

    try {
      await folder.renameFolder(renameFolderValue, selectedFolder);
      const { data } = await folder.getFolders(currentFolder);
      this.setState({
        folders: data,
        flagForLineLoader: true
      });
      this.onRenameFolderToggle();
    } catch (err) {
      errorHandler(err);
      this.onRenameFolderToggle();
    }
  };

  onRenameFolderCencel = () => {
    this.onRenameFolderToggle();
  };

  onRenameFolderToggle = () => {
    this.setState({
      isRenameModalVisible: !this.state.isRenameModalVisible,
      renameFolderValue: ''
    });
  };

  downloadFile = async (id, name) => {
    try {
      const { data } = await file.downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      link.click();
    } catch (err) {
      errorHandler(err);
    }
    return await file.downloadFile(id);
  };

  render = () => {
    const { userReducer } = this.props;
    const {
      files,
      title,
      folders,
      folderName,
      currentPage,
      isFilesLoaded,
      isModalVisible,
      isFoldersLoaded,
      renameFolderValue,
      foldersNavigation,
      flagForLineLoader,
      isRootFolderLoaded,
      isRenameModalVisible
    } = this.state;

    if (!userReducer.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    document.title = 'Files Manager';
    return (
      <div className="main-page">
        <InputModal
          title="Folder name"
          name="folderName"
          value={folderName}
          onChange={this.onChange}
          visible={isModalVisible}
          placeholder="Folder name"
          onModalOk={this.onModalOk}
          onModalCancel={this.onModalCancel}
        />
        <InputModal
          title="Rename folder"
          onChange={this.onChange}
          name="renameFolderValue"
          value={renameFolderValue}
          placeholder="Rename folder"
          visible={isRenameModalVisible}
          onModalOk={this.onRenameFolderOk}
          onModalCancel={this.onRenameFolderCencel}
        />
        <div className="main-page__header" />
        <div className="main-page__body">
          <SideNavigation currentPage={currentPage}>
            <SideNavigationItem redirect="/" icon="appstore" />
            <SideNavigationItem redirect="/logout" icon="logout" />
          </SideNavigation>
          <div className="main-page__center">
            <div className="files-nav">
              <div className="files-nav__loader">
                {!flagForLineLoader ? <LineLoader /> : null}
              </div>
              <div className="files-nav__content">
                <div className="files-nav__left-side">
                  {foldersNavigation.length === 1 ? (
                    <Icon
                      type="arrow-left"
                      className="files-nav__arrow-left--block"
                    />
                  ) : (
                    <Icon
                      type="arrow-left"
                      className="files-nav__arrow-left"
                      onClick={this.backFolder}
                    />
                  )}

                  <div className="files-nav__vertical-line" />
                  {isRootFolderLoaded ? (
                    <React.Fragment>
                      <Title level={4}>{title}</Title>
                      <Button
                        icon="folder-add"
                        size="small"
                        type="dashed"
                        onClick={this.toggleModal}
                      >
                        Create folder
                      </Button>
                      <label
                        htmlFor="fileUpload"
                        className="ant-btn asdasd ant-btn-dashed ant-btn-sm"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Icon type="file-add" />
                        <span>Upload file</span>
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          id="fileUpload"
                          onChange={this.uploadFile}
                        />
                      </label>
                    </React.Fragment>
                  ) : (
                    <div
                      className="skeleton"
                      style={{ width: '224px', height: '28px' }}
                    />
                  )}
                </div>
                <div className="files-nav__right-side">
                  <div className="main-page__folder-level">
                    {(() => {
                      let i = 0;
                      return foldersNavigation.map(el => {
                        i++;
                        const onDrop = e => {
                          const fileId = e.dataTransfer.getData('fileId');
                          const folderId = e.dataTransfer.getData('folderId');
                          if (fileId) {
                            file
                              .moveFile(fileId, el.id)
                              .then(() => {
                                this.getFiles(this.state.currentFolder);
                              })
                              .catch(errorHandler);
                          } else {
                            folder
                              .moveFolder(folderId, el.id)
                              .then(() => {
                                this.updateFolders(this.state.currentFolder);
                              })
                              .catch(errorHandler);
                          }
                          e.target.classList.toggle(
                            'main-page__folder-level--over'
                          );
                        };
                        const onDragEnter = e => {
                          e.currentTarget.classList.toggle(
                            'main-page__folder-level--over'
                          );
                        };
                        const onDragLeave = e => {
                          e.currentTarget.classList.toggle(
                            'main-page__folder-level--over'
                          );
                        };
                        return (
                          <React.Fragment key={el.id}>
                            {el.id === this.state.currentFolder ? (
                              <span className={`main-page__folder-level--`}>
                                {el.title}
                              </span>
                            ) : (
                              <span
                                className={`main-page__folder-level--active`}
                                onClick={() =>
                                  this.foldersNavigation(el.id, el.title)
                                }
                                onDrop={onDrop}
                                onDragLeave={onDragLeave}
                                onDragEnter={onDragEnter}
                                onDragOver={e => e.preventDefault()}
                              >
                                {el.title}
                              </span>
                            )}
                            {foldersNavigation.length === i ? null : (
                              <span className="main-page__slash">/</span>
                            )}
                          </React.Fragment>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
            <div className="main-page__files">
              <div className="folders-container">
                <div className="folders-container__title">
                  <Text strong>Folders ({folders.length})</Text>
                </div>
                <div className="folders-container__folders">
                  {isFilesLoaded && isFoldersLoaded ? (
                    folders.map(el => (
                      <FolderButton
                        key={el.folderId}
                        title={el.folderName}
                        onClickEditIcon={() =>
                          this.onRenameFolder(el.folderName, el.folderId)
                        }
                        {...el}
                        onClickFolderButton={() =>
                          this.getFolders(el.folderId, el.folderName)
                        }
                        getFiles={() => {
                          this.getFiles(this.state.currentFolder);
                        }}
                        getFolders={() => this.updateFolders()}
                      />
                    ))
                  ) : (
                    <React.Fragment>
                      <FolderButtonSkeleton />
                      <FolderButtonSkeleton />
                      <FolderButtonSkeleton />
                      <FolderButtonSkeleton />
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="files-container">
                <div className="files-container__title">
                  <Text strong>Files ({files.length})</Text>
                </div>
                <div className="files-container__files">
                  {isFilesLoaded && isFoldersLoaded ? (
                    files.map(file => (
                      <File
                        key={file.fileId}
                        fileName={file.fileName}
                        type={file.fileName.split('.')[1]}
                        onClick={() =>
                          this.downloadFile(file.fileId, file.fileName)
                        }
                        {...file}
                      />
                    ))
                  ) : (
                    <React.Fragment>
                      <FileSkeleton />
                      <FileSkeleton />
                      <FileSkeleton />
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="main-page__details" />
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};

export default connect(
  mapStateToProps,
  null
)(Home);
