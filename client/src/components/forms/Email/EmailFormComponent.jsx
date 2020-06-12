import React from 'react';
import { Form, Icon, Typography, Result } from 'antd';
import { Link } from 'react-router-dom';

import Input from '../../layout/Input';
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
    isSubmitting,
    isRegisteded
  } = props;

  if (isRegisteded) {
    return (
      <div className="forms-container__form">
        <Result
          style={{ padding: 0 }}
          status="success"
          title="Nice!"
          subTitle="An email has been sent to Your email address. Open it and follow the instructions in the email."
          extra={[
            <Link to="/login">
              <PrimaryButton>Got it!</PrimaryButton>
            </Link>
          ]}
        />
        ,
      </div>
    );
  }

  return (
    <div className="forms-container__form">
      <Title level={3}>Reset Password</Title>
      <p className="forms-container__message">
        Enter the email address you entered during registration
      </p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Input
          touched={touched}
          values={values}
          errors={errors}
          fieldName="email"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Email"
        >
          <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
        </Input>
        <Form.Item>
          <PrimaryButton block htmlType="submit" loading={isSubmitting}>
            Reset password
          </PrimaryButton>
        </Form.Item>
        <div className="forms-container__or">
          <div />
          <p>or</p>
          <div />
        </div>
        <Form.Item>
          <Link to="/login">
            <DefaultButton block>Log in</DefaultButton>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
