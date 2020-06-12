import React from 'react';
import { Button } from 'antd';

const DefaultButton = (props) => {
  return (
    <Button type="default" {...props}>
      {props.children}
    </Button>
  );
};

export default DefaultButton;
