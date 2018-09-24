/**
 *
 * Admin: A wrapper around all the admin sub routes
 *
 */
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Admin.css';

// Could redirect to / after login but reusing LandingPage for now
// as there will be a separate Loggded in Landing that contains draft content
// import LandingPage from 'components/Pages/LandingPage';
import Dashboard from './Dashboard/Loadable';
import PageUpload from './PageUpload/Loadable';
import VideoEditProject from '../Project/EditProject/VideoEditProject';
import VideoReviewProject from '../Project/ReviewProject/VideoReviewProject';

/* eslint-disable react/prefer-stateless-function */
class Admin extends PureComponent {
  render() {
    return (
      <div className="admin">
        <Switch>
          <Route exact path="/admin/dashboard" component={ Dashboard } />
          <Route path="/admin/upload" component={ PageUpload } />
          <Route path="/admin/video/:videoID/review" component={ VideoReviewProject } />
          <Route path="/admin/video/:videoID/edit" component={ VideoEditProject } />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Admin;
