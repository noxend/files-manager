import React from 'react';
import { Formik } from 'formik';
import validator from 'validator';
import { notification } from 'antd';
import { user as userApi } from '../../../services/api';
import * as yup from 'yup';

import EmailFormComponent from './EmailFormComponent';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Field is required')
    .email('Invalid email format')
});

const formValidation = View => {
  return class extends React.Component {
    state = {
      isRegisteded: false
    };
    render = () => {
      return (
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            userApi.resetPasswordEmail(values.email).then(() => {
              this.setState({
                isRegisteded: true
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

export default formValidation(EmailFormComponent);
