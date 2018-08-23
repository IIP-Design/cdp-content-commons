import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import './Nav.css';
import { Icon, Responsive } from 'semantic-ui-react';
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';

class Nav extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      mobileNavVisible: false
    };
    this.navClick = this.handleNavClick.bind( this );
    this.keyUp = this.handleKeyUp.bind( this );
  }

  handleKeyUp( e ) {
    if ( e.key === 'Enter' ) {
      this.handleNavClick();
    }
  }

  handleNavClick() {
    if ( !this.state.mobileNavVisible ) {
      this.setState( { mobileNavVisible: true } );
    } else {
      this.setState( { mobileNavVisible: false } );
    }
  }

  render() {
    const { mobileNavVisible } = this.state;

    return (
      <nav>
        <Responsive
          as={ Icon }
          name="content"
          maxWidth={ 992 }
          onClick={ this.navClick }
          onKeyUp={ this.keyUp }
          tabIndex={ 0 }
          className={ mobileNavVisible ? 'mobileNav' : 'fullNav' }
        />

        { !this.props.loggedIn &&
          <LoggedOutNav
            mobileNavVisible={ mobileNavVisible }
            toggleMobileNav={ this.navClick }
            keyUp={ this.keyUp }
          />
        }
        { this.props.loggedIn &&
          <LoggedInNav
            mobileNavVisible={ mobileNavVisible }
            toggleMobileNav={ this.navClick }
            keyUp={ this.keyUp }
          />
        }
      </nav>
    );
  }
}

const mapStateToProps = ( { loggedIn } ) => ( {
  loggedIn
} );

Nav.propTypes = {
  loggedIn: bool
};

export default connect( mapStateToProps )( Nav );
