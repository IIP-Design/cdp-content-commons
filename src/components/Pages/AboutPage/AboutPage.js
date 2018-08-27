import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';

import config from '../../../config';

class AboutPage extends Component {
  constructor() {
    super();
    this.state = {
      content: <div>Loading...</div>
    };
  }

  componentDidMount() {
    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.ABOUT_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  onFetchResult = ( result ) => {
    sessionStorage.setItem( 'AboutPage', result );
    this.setState( {
      content: <ReactMarkdown source={ result } />
    } );
  }

  onError = ( error ) => {
    this.setState( {
      content: config.ERROR_MESSAGE
    } );
  }

  checkSessionStorage() {
    const cachedAbout = sessionStorage.getItem( 'AboutPage' );
    if ( cachedAbout ) {
      this.setState( { content: <ReactMarkdown source={ cachedAbout } /> } );
      return true;
    }
    return false;
  }

  render() {
    const { content } = this.state;
    return (
      <Page>
        <Breadcrumbs />
        <Header as="h1">About Content Commons</Header>
        { content }
      </Page>
    );
  }
}

export default AboutPage;
