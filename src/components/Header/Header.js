import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import './Header.css';
import Heading from '../Heading';
import Nav from '../Nav';
import Search from '../Search';

const HeaderItem = ( props ) => {
  const pagePath = props.location.pathname.split( '/' ).slice( 1 )[0];
  const barClass = `bar ${pagePath === '' ? 'bar--home' : `bar--${pagePath}`}`;

  return (
    <section className={ barClass }>
      <div className="ui container">
        <header>
          <Heading />
          <Search />
          <Nav />
        </header>
      </div>
    </section>
  );
};

HeaderItem.propTypes = {
  location: object
};

export default withRouter( HeaderItem );
