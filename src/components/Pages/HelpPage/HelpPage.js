import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import Page from '../PageTmpl';
import Breadcrumbs from '../../Breadcrumbs';

import config from '../../../config';

class HelpPage extends Component {
  constructor() {
    super();
    this.state = {
      content: <div>Loading...</div>
    };
  }

  componentDidMount() {
    const cached = this.checkSessionStorage();
    if ( !cached ) {
      axios.get( config.HELP_URL )
        .then( response => this.onFetchResult( response.data ), error => this.onError( error ) );
    }
  }

  onFetchResult = ( result ) => {
    sessionStorage.setItem( 'HelpPage', result );
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
    const cachedHelp = sessionStorage.getItem( 'HelpPage' );
    if ( cachedHelp ) {
      this.setState( { content: <ReactMarkdown source={ cachedHelp } /> } );
      return true;
    }
    return false;
  }

  render() {
    const { content } = this.state;
    return (
      <Page>
        <Breadcrumbs />
        <Header as="h1">
          Help
          <Header.Subheader>Common questions and solutions for Content Commons.</Header.Subheader>
        </Header>
        { content }
      </Page>
    );
  }
}

export default HelpPage;
