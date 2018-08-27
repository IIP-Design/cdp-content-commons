import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';

import config from '../../../config';

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {
      content: <div>Loading...</div>
    };
  }

  componentDidMount() {
    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.CONTACT_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  onFetchResult = ( result ) => {
    sessionStorage.setItem( 'ContactPage', result );
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
    const cachedContact = sessionStorage.getItem( 'ContactPage' );
    if ( cachedContact ) {
      this.setState( { content: <ReactMarkdown source={ cachedContact } /> } );
      return true;
    }
    return false;
  }

  render() {
    const { content } = this.state;
    return (
      <Page>
        <Breadcrumbs />
        <Header as="h1">Contact Us</Header>
        { content }
      </Page>
    );
  }
}

export default ContactPage;
