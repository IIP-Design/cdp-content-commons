/**
 *
 * LoginPage
 *
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import { makeSelectAuthenticated, makeSelectError } from '../selectors';
import { Button, Message } from 'semantic-ui-react';
import ButtonGoogle from 'components/ButtonGoogle';

import Page from 'components/Page';

import './PageLogin.css';

class PageLogin extends PureComponent {
  componentWillMount() {
    this.props.resetError();
  }

  handleClickGoogleLogin = () => {
    this.props.willGoogleLogin( this.props.history );
  };

  handleClickLogout = () => {
    this.props.logout();
  };

  renderLoginPage = () => {
    const { errorMessage } = this.props;

    return (
      <Page title="Login" description="Login to Content Commons">
        <div className="login login_wrapper">
          <h1>Log In</h1>
          <p className="login_subtext">Log in to collect, upload, and manage content in the Content Commons.</p>
          <ButtonGoogle
            clientid={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
            onClick={ this.handleClickGoogleLogin }
          >Login america.gov
          </ButtonGoogle>
          <Message negative hidden={ !errorMessage }>{ errorMessage }</Message>

          { /* /------- NOT INCL IN MVP  --------/ */ }
          { /* <p className="login_optionText">Or</p>
        <Form>
          <Form.Input label="Email" type="text" placeholder="Your email address" />
          <Form.Input label="Password" type="password" placeholder="********" />
          <div className="login_email">
            <div className="login_email--button">
              <Button type="submit">Log in</Button>
            </div>
            <div className="login_email--account">
              <Link to="#">Forgot your password?</Link>
              <p>Don't have an account? <Link to="#">Register</Link></p>
            </div>
          </div>
        </Form> */ }

        </div>
      </Page>
    );
  }

  renderLogoutPage = () => (
    <Page title="Login" description="Login to Content Commons">
      <div className="login login_wrapper">
        <h1>Log Out</h1>
        <p className="login_subtext">Log out of the Content Commons.</p>
        <Button onClick={ this.handleClickLogout }>Log out</Button>
      </div>
    </Page>
  );

  render() {
    if ( this.props.authenticated ) {
      return this.renderLogoutPage();
    }

    return this.renderLoginPage();
  }
}


PageLogin.propTypes = {
  logout: PropTypes.func,
  willGoogleLogin: PropTypes.func,
  resetError: PropTypes.func,
  authenticated: PropTypes.object,
  history: PropTypes.object,
  errorMessage: PropTypes.string
};

const mapStateToProps = state => createStructuredSelector( {
  authenticated: makeSelectAuthenticated(),
  errorMessage: makeSelectError()
} );

export default withRouter( connect( mapStateToProps, actions )( PageLogin ) );
