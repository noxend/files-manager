import React from 'react';
import { Formik } from 'formik';
import validator from 'validator';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { user as userApi } from '../../../services/api';

import { userAction } from '../../../actions';

import LoginComponent from './LoginFormComponent';

const formValidation = View => {
  return class extends React.Component {
    validate = values => {
      let errors = {};

      if (validator.isEmpty(values.email) && !errors.email)
        errors.email = 'Field is required';
      if (!validator.isEmail(values.email) && !errors.email)
        errors.email = 'Invalid email format';

      if (validator.isEmpty(values.password) && !errors.password)
        errors.password = 'Field is required';

      return errors;
    };

    onSubmit = (values, { setSubmitting }) => {
      const { loginUser } = this.props;

      userApi
        .login(values)
        .then(({ data }) => {
          loginUser(data.token);
          notification.success({
            message: 'Success',
            description: 'Welcome back!',
            placement: 'bottomLeft'
          });
          setSubmitting(false);
        })
        .catch(({ response: { data } }) => {
          if (data.type === 'unconfirmed') {
            notification.error({
              message: 'Error',
              description:
                'Your account is not confirmed. Please check your email',
              placement: 'bottomLeft'
            });
          } else {
            notification.error({
              message: 'Error',
              description: 'Incorrect email or password',
              placement: 'bottomLeft'
            });
          }
          setSubmitting(false);
        });
    };

    render = () => {
      return (
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={this.validate}
          onSubmit={this.onSubmit}
        >
          {props => {
            return <View {...props} />;
          }}
        </Formik>
      );
    };
  };
};

export default connect(
  null,
  { loginUser: userAction.loginUser }
)(formValidation(LoginComponent));
