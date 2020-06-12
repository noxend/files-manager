import React from 'react';
import { Formik } from 'formik';
import validator from 'validator';
import { notification } from 'antd';
import { user as userApi } from '../../../services/api';

import RegisterComponent from './RegisterFormComponent';

const formValidation = View => {
  return class extends React.Component {
    state = {
      isRegisteded: false
    };
    render = () => {
      return (
        <Formik
          initialValues={{
            email: '',
            password: '',
            passConfirm: '',
            name: ''
          }}
          validate={values => {
            let errors = {};

            if (validator.isEmpty(values.name) && !errors.name)
              errors.name = 'Field is required';

            if (validator.isEmpty(values.email) && !errors.email)
              errors.email = 'Field is required';
            if (!validator.isEmail(values.email) && !errors.email)
              errors.email = 'Invalid email format';

            if (validator.isEmpty(values.password) && !errors.password)
              errors.password = 'Field is required';

            if (validator.isEmpty(values.passConfirm) && !errors.passConfirm)
              errors.passConfirm = 'Field is required';
            if (
              !validator.equals(values.password, values.passConfirm) &&
              !errors.passConfirm
            ) {
              errors.passConfirm = 'Passwords must match';
              errors.password = 'Passwords must match';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            userApi
              .registration({
                username: values.name,
                email: values.email,
                password: values.password,
                passConfirm: values.passConfirm
              })
              .then(() => {
                this.setState({
                  isRegisteded: true
                });
                notification.success({
                  message: 'Success',
                  description: 'You are registered. Now log in.',
                  placement: 'bottomLeft'
                });
                setSubmitting(false);
              })
              .catch(err => {
                notification.error({
                  message: 'Error',
                  description: err.response.data.message,
                  placement: 'bottomLeft'
                });
                setSubmitting(false);
              });
          }}
        >
          {props => {
            return <View {...props} {...this.state} />;
          }}
        </Formik>
      );
    };
  };
};

export default formValidation(RegisterComponent);
