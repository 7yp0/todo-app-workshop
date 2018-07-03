import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import loginMutation from './graphql/loginMutation.gql';
import registerMutation from './graphql/registerMutation.gql';
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
} from '../../utils/authorization';
import Status from '../../components/Status';
import { addToast as addToastAction } from '../../actions/notifications';

const mapDispatchToProps = {
  addToast: addToastAction,
};

@connect(
  null,
  mapDispatchToProps,
)
@withRouter
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  static get token() {
    return getTokenFromLocalStorage();
  }

  componentDidMount() {
    if (Login.token) {
      this.redirect();
    }
  }

  redirect = () => {
    const { history } = this.props;

    history && history.push('/todo');
  };

  loginSuccess = () => {
    const { addToast } = this.props;

    addToast('successfully logged in');

    this.redirect();
  };

  registerSuccess = () => {
    const { addToast } = this.props;

    addToast('successfully registered');

    this.redirect();
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    return (
      <form>
        <input
          type="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />

        <Mutation mutation={loginMutation} onCompleted={this.loginSuccess}>
          {(logIn, { loading, data }) => {
            if (loading) {
              return <Status />;
            }

            data && saveTokenToLocalStorage(data.signIn);

            return (
              <button
                type="button"
                onClick={() => {
                  logIn({
                    variables: {
                      email: this.state.email,
                      password: this.state.password,
                    },
                  });
                }}
              >
                log in
              </button>
            );
          }}
        </Mutation>
        <br />
        <Mutation
          mutation={registerMutation}
          onCompleted={this.registerSuccess}
        >
          {(register, { loading, data }) => {
            if (loading) {
              return <Status />;
            }

            data && saveTokenToLocalStorage(data.signIn);

            return (
              <button
                type="button"
                onClick={() => {
                  register({
                    variables: {
                      email: this.state.email,
                      password: this.state.password,
                    },
                  });
                }}
              >
                register
              </button>
            );
          }}
        </Mutation>
      </form>
    );
  }
}

export default Login;
