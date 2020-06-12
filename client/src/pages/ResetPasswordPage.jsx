import React from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EmailForm from '../components/forms/Email';

const LoginPage = props => {
  const { userReducer } = props;

  if (userReducer.isAuthenticated) {
    return <Redirect to="/" />;
  }

  document.title = 'Log in to Files Manager';
  return (
    <div className="login-page">
      <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={9}>
        <div className="forms-container">
          <Row type="flex" style={{ justifyContent: 'stretch' }}>
            <Col
              span={10}
              xs={0}
              sm={10}
              className="forms-container__image-wrapper"
            >
              <div className="forms-container__image" />
            </Col>
            <Col span={14} xs={24} sm={14}>
              <EmailForm />;
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};

export default connect(mapStateToProps)(LoginPage);
