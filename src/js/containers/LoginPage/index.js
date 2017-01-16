import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { login } from './actions';

import Box from 'grommet/components/Box';
import UserForm from 'grommet-cms/components/Dashboard/UserForm';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  _onChange(event) {
    const key = event.target.id;
    const val = event.target.value;
    let obj  = {};
    obj[key] = val;
    this.setState(obj);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state));
  }

  render() {
    let loginError = (this.props.loginError !== '')
      ? <span>{this.props.loginError}</span>
      : null;

    let onSubmitClick = (this.state.username && this.state.password)
      ? this._onSubmit
      : null;

    return (
      <Box full="vertical" pad="large" align="center" justify="center">
        <UserForm title="Login" username={this.state.username}
          password={this.state.password} onChange={this._onChange}
          onSubmit={onSubmitClick} logo={this.context.formLogo} hasLogo />
          {loginError}
      </Box>
    );
  }
};

LoginPage.contextTypes = {
  config: React.PropTypes.shape({
    cms: React.PropTypes.shape({
      formLogo: React.PropTypes.element.isRequired
    })
  })
};

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { loginRequest, loginError, loggedIn } = state.login;
  return {
    loginRequest,
    loginError,
    loggedIn
  };
};

export default connect(mapStateToProps)(LoginPage);
