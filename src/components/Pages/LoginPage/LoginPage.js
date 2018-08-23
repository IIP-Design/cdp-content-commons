import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import { connect } from 'react-redux';
import { login, logout } from '../../../actions/loginTEMP';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import Page from '../PageTmpl';
import './LoginPage.css';

class LoginPage extends Component {
  constructor( props ) {
    super( props );
    this.loginClick = this.loginClick.bind( this );
    this.logoutClick = this.logoutClick.bind( this );
  }

  loginClick() {
    this.props.login();
    // TEMP - Redirect to homepage
    this.props.history.push( '/' );
  }

  logoutClick() {
    this.props.logout();
  }

  render() {
    const isLoggedIn = this.props.loggedIn;
    return (
      <Page>
        <div className="login login_wrapper">
          <h1>Log In</h1>
          <p className="login_subtext">Log in to collect, upload, and manage content in the Content Commons.</p>
          { isLoggedIn && <Button onClick={ this.logoutClick }>Logout</Button> }
          { !isLoggedIn && <Button onClick={ this.loginClick }>Log in with America.gov</Button> }
          { /*
          /------- NOT INCL IN MVP  --------/
          <p className="login_optionText">Or</p>
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
          </Form>
          */ }
        </div>
      </Page>
    );
  }
}

const mapStateToProps = ( { loggedIn } ) => ( {
  loggedIn
} );

LoginPage.propTypes = {
  login: func,
  logout: func,
  loggedIn: bool,
  history: object,
  push: func
};

export default connect( mapStateToProps, { login, logout } )( LoginPage );
