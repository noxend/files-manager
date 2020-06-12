import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userAction } from '../actions';

const LogoutPage = ({ logoutUser }) => {
  logoutUser();
  return <Redirect to="/login" />;
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  const { logoutUser } = bindActionCreators(userAction, dispatch);
  return {
    logoutUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutPage);
