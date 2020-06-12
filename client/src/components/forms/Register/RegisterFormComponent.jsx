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
    isSubmitting,
    isRegisteded
  } = props;

  if (isRegisteded) {
    return (
      <div className="forms-container__form">
        <Result
          status="success"
          title="Thanks for registering!"
          subTitle="An email has been sent to your email with a link to verify your account. Confirmation is optional, but it gives you more options"
          extra={[
            <Link to="/login">
              <PrimaryButton>Let's log in!</PrimaryButton>
            </Link>
          ]}
        />
        ,
      </div>
    );
  }

  return (
    <div className="forms-container__form">
      <Title level={3}>Sing in</Title>
      <p className="forms-container__message">
        Fill in all the fields to create an account
      </p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Input
          touched={touched}
          values={values}
          errors={errors}
          fieldName="name"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Name"
        >
          <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
        </Input>
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
        <InputPassword
          touched={touched}
          values={values}
          errors={errors}
          fieldName="passConfirm"
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Password confirmation"
        >
          <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
        </InputPassword>
        <Form.Item>
          <PrimaryButton block htmlType="submit" loading={isSubmitting}>
            Sign up
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
