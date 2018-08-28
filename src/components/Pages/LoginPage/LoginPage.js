import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import Page from '../PageTmpl';
import './LoginPage.css';

const LoginPage = props => (
  <Page>
    <div className="login login_wrapper">
      <h1>Log In</h1>
      <p className="login_subtext">Log in to collect, upload, and manage content in the Content Commons.</p>
      <Button>Log in with America.gov</Button>
      { /*
      <p className="login_optionText">Or</p>
      <Form>
        <Form.Input label='Email' type='input' placeholder='Your email address' />
        <Form.Input label='Password' type='password' placeholder='*********' />
        <Form.Field>
          <div className="login_email">
            <div className="login_email--button">
              <Button type='submit'>Log in</Button>
            </div>
            <div className="login_email--account">
              <Link to='#'>Forgot your password?</Link>
              <p>Don't have an account? <Link to='#'>Register!</Link></p>
            </div>
          </div>
        </Form.Field>
      </Form>
      */ }
    </div>
  </Page>
);

export default LoginPage;
