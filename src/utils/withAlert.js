import React, { Component } from 'react';
import { detect } from 'detect-browser';
import { getOpenNetRequest } from './api';
import { Icon } from 'semantic-ui-react';

import '../assets/styles/alert.css';

const withAlert = ( WrappedComponent ) => {
  class HOC extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        showAlert: false
      };
    }

    componentDidMount() {
      this.isOpenNet();
    }

    getAlert = () => (
      <div className="alert-bar">
        OpenNet users: please use Chrome for the best Content Commons experience.
        <Icon name="close" onClick={ this.handleClose } className="close" />
      </div>
    );

    handleClose = ( e ) => {
      e.preventDefault();
      this.setState( { showAlert: false } );
    };

    isOpenNet = () => {
      const browser = detect();
      const isChrome = browser && browser.name === 'chrome';
      const isFireFox = browser && browser.name === 'firefox';
      let showAlert = !isChrome && !isFireFox;
      if ( showAlert ) {
        // Fetch OpenNet flag from API
        try {
          getOpenNetRequest().then( ( response ) => {
            if ( response.error ) showAlert = false;
            else showAlert = response.isOpenNet;
            this.setState( {
              showAlert
            } );
          } );
        } catch ( err ) {
          this.setState( {
            showAlert: false
          } );
        }
      } else {
        this.setState( {
          showAlert: false
        } );
      }
    };

    render() {
      return (
        <WrappedComponent
          { ...this.props }
          getAlert={ this.getAlert }
          showAlert={ this.state.showAlert }
        />
      );
    }
  }

  return HOC;
};

export default withAlert;
