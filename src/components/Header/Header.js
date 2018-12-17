import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { object, func, bool } from 'prop-types';
import './Header.css';
import Heading from '../Heading';
import Nav from '../Nav';
import Search from '../Search';
import withAlert from '../../utils/withAlert';

class HeaderItem extends Component {
  shouldComponentUpdate( nextProps ) {
    return this.props.location.pathname !== nextProps.location.pathname
      || this.props.showAlert !== nextProps.showAlert;
  }

  getBarClass = () => {
    const pagePath = this.props.location.pathname.split( '/' ).slice( 1 );
    const barPage = pagePath[0] === '' ? 'bar--home' : pagePath.map( path => `bar--${path}` ).join( ' ' );
    const showAlert = this.props.showAlert ? ' alert-shown' : '';
    return `bar ${barPage}${showAlert}`;
  };

  render() {
    return (
      <section className={ this.getBarClass() }>
        <div className="ui container">
          <header>
            <Heading isLanding={ this.getBarClass() === 'bar bar--home' } />
            <Search />
            <Nav />
          </header>
        </div>
        { this.props.showAlert ? this.props.getAlert() : null }
      </section>
    );
  }
}

HeaderItem.propTypes = {
  location: object,
  getAlert: func,
  showAlert: bool
};


export default withRouter( withAlert( HeaderItem ) );
