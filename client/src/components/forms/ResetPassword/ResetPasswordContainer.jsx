import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import validator from 'validator';
import { notification, Modal } from 'antd';
import { user as userApi } from '../../../services/api';

import ResetPasswordComponent from './ResetPasswordComponent';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Field is required')
    .max(24, 'Too long, maximum length 24 characters')
    .min(6, 'Too short, minimum length 6 characters'),

  passConfirm: yup
    .string()
    .required('Field is required')
    .oneOf([yup.ref('password'), null], "Passwords don't match")
});

const formValidation = View => {
  return class extends React.Component {
    redirectTo = to => {
      this.props.history.replace(to);
    };

    render = () => {
      return (
        <Formik
          initialValues={{
            password: '',
            passConfirm: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { hash } = this.props.match.params;
            const redirectTo = this.redirectTo.bind(this);

            userApi
              .resetPassword({ hash, password: values.password })
              .then(() => {
                notification.success({
                  message: 'Great, Password Changed',
                  description: 'You can now log in to your account.',
                  placement: 'topRight'
                });
                this.props.history.replace('/login');
                setSubmitting(false);
              })
              .catch(({ response }) => {
                if (response.data.type === 'alredy-restored') {
                  Modal.warning({
                    title: 'Already Changed',
                    content:
                      'On this link already changed the password. Send password change requests again.',
                    okText: 'Got it!',
                    onOk() {
                      redirectTo('/login');
                    },
                    onCancel() {
                      redirectTo('/login');
                    }
                  });
                }
                if (response.data.type === 'time-expired') {
                  Modal.warning({
                    title: 'Time Expired',
                    content:
                      'The password change link has expired. Send password change requests again.',
                    okText: 'Got it!',
                    onOk() {
                      redirectTo('/login');
                    },
                    onCancel() {
                      redirectTo('/login');
                    }
                  });
                }
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

export default formValidation(ResetPasswordComponent);
