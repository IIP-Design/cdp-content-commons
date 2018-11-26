/**
 *
 * SearchBar
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectSearchBar from './selectors';
import { Form } from 'semantic-ui-react';

// Restructure to v2 layout - putting here to ensure it is ported from v1
import axios from 'axios';
import { languages, getDirection } from 'utils/language';
import config from 'config';

import './SearchBar.css';

class SearchBar extends PureComponent {
  constructor( props ) {
    super( props );
    this.URL = `${config.GOOGLE_LANGUAGE_DETECT_URL}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      direction: 'left'
    };
  }

  getDetections = ( result ) => {
    if ( result && result.data && result.data.data && result.data.data.detections ) {
      const { detections } = result.data.data;
      return detections.length && detections[0].length ? detections[0][0].language : null;
    }
    return null;
  }

  async fetchTextLanguage( text ) {
    const result = await axios.post( `${this.URL}&q=${text}` );
    const language = this.getDetections( result );
    if ( language ) {
      this.setState( {
        // eslint-disable-next-line react/no-unused-state
        direction: getDirection( language )
      } );
      return ( languages[language] ) ? languages[language] : null;
    }
    return null;
  }

  handleQueryOnChange = async ( e ) => {
    const text = e.target.value;
    // this.props.updateSearchQuery( text );
    this.fetchTextLanguage( text )
      .then( ( language ) => {
        if ( language ) {
          // this.props.languageUpdate( language );
        }
      } )
      .catch( err => console.log( err ) );
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    // this.props.createRequest();
    // this.props.history.push( '/search' );
  };

  render() {
    // This is not a complete port og google translate api; refer to v1 to complete
    return (
      <section className="search_bar">
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group>
            <Form.Input
              placeholder="Type in keywords to search our content"
              className="search_input"
              onChange={ this.handleQueryOnChange }
              value={ this.props.searchTerm ? this.props.searchTerm : '' }
            />
            <Form.Button icon="search" type="submit" />
          </Form.Group>
        </Form>
      </section>
    );
  }
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  searchbar: makeSelectSearchBar()
} );

export default withRouter( connect( mapStateToProps, actions )( SearchBar ) );
