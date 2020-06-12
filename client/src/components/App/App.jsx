import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import { userAction } from '../../actions';
import {
  RegisterPage,
  LoginPage,
  LogoutPage,
  ConfirmationPage,
  ChangePasswordPage,
  ResetPasswordPage
} from '../../pages';
import { setAuthToken } from '../../utils/auth';

import Home from '../../pages/Home';
import Spinner from '../../components/layout/Spinner';

import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  componentDidMount = () => {
    const { loginUser } = this.props;
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      loginUser(localStorage.jwtToken);
    }
  };

  componentDidUpdate = () => {
    const { userReducer } = this.props;

    if (userReducer.isSessionTimeExpired) {
      this.sessionExpiredModal();
    }
  };

  sessionExpiredModal = () => {
    const { logoutUser } = this.props;

    Modal.warning({
      title: 'The session time is over',
      content: 'Session time expired. Please reconnect to continue.',
      okText: 'OK',
      onOk() {
        logoutUser();
      },
      onCancel() {
        logoutUser();
      }
    });
  };

  render = () => {
    const { userReducer } = this.props;

    if (userReducer.isUserDataLoading) {
      return (
        <div className="spinner-container">
          <Spinner />
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/confirmation/:hash" component={ConfirmationPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/change-password/:hash" component={ChangePasswordPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  };
}

const mapDispatchToProps = dispatch => {
  const { loginUser, logoutUser } = bindActionCreators(userAction, dispatch);
  return {
    loginUser,
    logoutUser
  };
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);