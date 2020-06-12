import React from 'react';
import { Modal, Input } from 'antd';

const InputModal = (props) => {

  const { onModalOk, onModalCancel, visible, onChange, value, placeholder, name, title } = props;
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onModalOk}
      onCancel={onModalCancel}
    >
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </Modal>
  );
}

export default InputModal;
