import React, { Component } from 'react';
import { Result, Button, Col } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';

import { user as userApi } from '../services/api';

export default class ConfirmationPage extends Component {
  state = {
    type: null,
    isLoaded: true
  };

  componentDidMount = async () => {
    const { hash } = this.props.match.params;
    try {
      const result = await userApi.confirmUserAccount(hash);
      this.setState({
        type: result.data.type,
        isLoaded: false
      });
    } catch (err) {
      this.setState({
        type: err.response.data.type,
        isLoaded: false
      });
    }
  };

  render() {
    const confirmed = (
      <Result
        status="success"
        title="Your account confirmed. Thank you!"
        subTitle="Now you have access to all features."
        extra={[
          <Link to="/">
            <Button type="primary">Let's use!</Button>
          </Link>
        ]}
      />
    );

    const error = (
      <Result
        status="error"
        title="Unknown error."
        subTitle="Please try again later or send a confirmation email again from your account settings."
        extra={[
          <Link to="/">
            <Button type="primary">Main</Button>
          </Link>,
          <Link to="/profile">
            <Button type="default">Account settings</Button>
          </Link>
        ]}
      />
    );

    const alredyConfimed = (
      <Result
        title="Your email already confirmed."
        extra={[
          <Link to="/">
            <Button type="primary">Main</Button>
          </Link>
        ]}
      />
    );

    const timeExpired = (
      <Result
        status="warning"
        title="Account verification time has expired."
        subTitle="In your account settings, send another email to confirm your account."
        extra={[
          <Link to="/">
            <Button type="primary">Main</Button>
          </Link>,
          <Link to="/profile">
            <Button type="default">Account settings</Button>
          </Link>
        ]}
      />
    );

    const typeRender = () => {
      const { type } = this.state;

      switch (type) {
        case 'confirmed':
          return confirmed;
        case 'time-expired':
          return timeExpired;
        case 'alredy-confirmed':
          return alredyConfimed;

        default:
          return error;
      }
    };

    if (this.state.isLoaded) {
      return (
        <div
          style={{
            top: '160px',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%'
          }}
        >
          <Spinner />
        </div>
      );
    }

    return (
      <div
        style={{
          top: '160px',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%'
        }}
      >
        <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={9}>
          <div className="forms-container">{typeRender()}</div>
        </Col>
      </div>
    );
  }
}
