import React from 'react';
import { Form, Icon, Typography } from 'antd';
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
      <Title level={3}>Log in</Title>
      <p className="forms-container__message">
        Fill in the fields what to sign in to your account
      </p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Input
          touched={touched}
          values={values}
          errors={errors}
          fieldName="email"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="E-Mail"
        >
          <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
        </Input>
        <InputPassword
          touched={touched}
          values={values}
          errors={errors}
          fieldName="password"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Password"
        >
          <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
        </InputPassword>
        <Form.Item>
          <div className="forms-container-bottom">
            <PrimaryButton htmlType="submit" loading={isSubmitting}>
              Log in
            </PrimaryButton>
            <Link to="/reset-password" className="login-form-forgot">
              Forgot your password?
            </Link>
          </div>
        </Form.Item>
        <div className="forms-container__or">
          <div />
          <p>or</p>
          <div />
        </div>
        <Form.Item>
          <Link to="/register">
            <DefaultButton block>Sign up</DefaultButton>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
