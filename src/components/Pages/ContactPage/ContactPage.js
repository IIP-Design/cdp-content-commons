import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';
import './ContactPage.css';

class ContactPage extends Component {
  componentWillMount() {
    const cachedContact = sessionStorage.getItem( 'ContactPage' );
    if ( cachedContact ) {
      this.setState( { markdown: cachedContact } );
      return;
    }

    fetch( config.CONTACT_URL )
      .then( response => response.text() )
      .then( text => this.onFetchResult( text ) );
  }

  componentDidMount() {
    window.scrollTo( 0, 0 );
  }

  onFetchResult = ( text ) => {
    sessionStorage.setItem( 'ContactPage', text );
    this.setState( {
      markdown: text
    } );
  }

  render() {
    if ( this.state ) {
      const { markdown } = this.state;
      return (
        <section className="contact">
          <Breadcrumbs />
          <Header as="h1">Contact Us</Header>
          <ReactMarkdown source={ markdown } />
        </section>
      );
    }
    return <div />;
  }
}

export default ContactPage;