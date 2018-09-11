import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.css';

import withAuth from 'hocs/withAuth';
import Admin from '../Admin/Loadable';

// import { ScrollToTop } from './utils/helpers';
import LandingPage from 'components/PageLanding';
import PageLogin from 'containers/Auth/PageLogin/Loadable';

import PageRegister from 'components/PageRegister/Loadable';
import PageRegistrationPendingApproval from 'components/PageRegistrationPendingApproval/Loadable';

// Markdown pages
import AboutPage from 'components/pagesStatic/AboutPage/Loadable';
import HelpPage from 'components/pagesStatic/HelpPage/Loadable';
import ContactPage from 'components/pagesStatic/ContactPage/Loadable';
import PrivacyPage from 'components/pagesStatic/PrivacyPage/Loadable';

// import VideoPage from './components/Pages/VideoPage';
import PageSearch from 'containers/PageSearch/Loadable';

import Header from 'components/Header';
import Footer from 'components/Footer';

/* api test
fetch( 'v1/api/auth' )
  .then( resp => resp.json() )
  .then( ( data ) => {
    console.log( data );
  } );
*/

const App = () => (
  <div>
    <Helmet
      titleTemplate="%s | Content Commons"
      defaultTitle="Content Commons"
    >
      <meta
        name="description"
        content="The Content Commons is the portal to search and share
      content from the U.S. Department of State’s Bureau of International Information Programs (IIP)."
      />
    </Helmet>
    <Header />
    <div className="ui container">
      { /* <Route component={ ScrollToTop } /> */ }
      <Switch>
        <Route path="/" exact component={ LandingPage } />
        <Route path="/admin" component={ withAuth( Admin ) } />
        <Route path="/login" component={ PageLogin } />
        <Route path="/register" component={ PageRegister } />
        <Route path="/registration-pending-approval" component={ PageRegistrationPendingApproval } />
        <Route path="/search" component={ PageSearch } />
        <Route path="/about" component={ AboutPage } />
        <Route path="/help" component={ HelpPage } />
        <Route path="/privacy" component={ PrivacyPage } />
        <Route path="/contact" component={ ContactPage } />
        { /* <Route path="/video" component={ VideoPage } /> */ }
        <Redirect to="/" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
