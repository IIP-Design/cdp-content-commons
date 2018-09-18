/**
 *
 * Admin: A wrapper around all the admin sub routes
 *
 */
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './Admin.css';

// Could redirect to / after login but reusing LandingPage for now
// as there will be a separate Loggded in Landing that contains draft content
// import LandingPage from 'components/Pages/LandingPage';
import Dashboard from './Dashboard/Loadable';
import PageUpload from './PageUpload/Loadable';
import EditProject from './EditProject/Loadable';

/* eslint-disable react/prefer-stateless-function */
class Admin extends PureComponent {
  render() {
    return (
      <div className="admin">
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="Adminstrative area for content authoring" />
        </Helmet>
        <div className="admin_wrapper">
          <Switch>
            <Route exact path="/admin/dashboard" component={ Dashboard } />
            <Route path="/admin/upload" component={ PageUpload } />
            <Route path="/admin/edit-project" component={ EditProject } />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
