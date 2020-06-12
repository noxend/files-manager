import React from 'react';
import { Form, Input } from 'antd';

const CustomInput = ({
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  children,
  placeholder,
  fieldName
}) => {
  return (
    <Form.Item
      hasFeedback
      validateStatus={
        !touched[fieldName]
          ? undefined
          : errors[fieldName]
          ? 'error'
          : 'success'
      }
      help={!touched[fieldName] ? '' : errors[fieldName]}
    >
      <Input.Password
        id={fieldName}
        value={values[fieldName]}
        onChange={handleChange}
        onBlur={handleBlur}
        prefix={children}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default CustomInput;
