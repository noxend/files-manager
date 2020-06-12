import React from 'react';
import { Form, Icon, Typography, Result } from 'antd';
import { Link } from 'react-router-dom';

import Input from '../../layout/Input';
import InputPassword from '../../layout/InputPassword';
import PrimaryButton from '../../layout/buttons/PrimaryButton';
import DefaultButton from '../../layout/buttons/DefaultButton';

const { Title } = Typography;

export default props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <div className="forms-container__form">
      <Title level={3}>Change password</Title>
      <p className="forms-container__message">Enter new password</p>
      <Form onSubmit={handleSubmit} className="login-form">
        <InputPassword
          touched={touched}
          values={values}
          errors={errors}
          fieldName="password"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="New password"
        >
          <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
        </InputPassword>
        <InputPassword
          touched={touched}
          values={values}
          errors={errors}
          fieldName="passConfirm"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Confirm new password"
        >
          <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
        </InputPassword>
        <Form.Item>
          <PrimaryButton block htmlType="submit" loading={isSubmitting}>
            Change password
          </PrimaryButton>
        </Form.Item>
      </Form>
    </div>
  );
};
