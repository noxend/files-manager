import React from 'react';
import { Button } from 'antd';

const PrimaryButton = (props) => {
  return (
    <Button type="primary" {...props}>
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
