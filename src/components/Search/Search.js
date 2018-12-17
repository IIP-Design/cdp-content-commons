import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { func, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form, Input, Icon } from 'semantic-ui-react';
import config from '../../config';
import './Search.css';


// Text language detect - move to v2
import axios from 'axios';
import { languages, getDirection } from '../../utils/language';

class Search extends Component {
  constructor( props ) {
    super( props );
    this.URL = `${config.GOOGLE_LANGUAGE_DETECT_URL}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    this.state = {
      direction: 'left'
    };
  }

  componentDidMount() {
    // Clear session if on home page
    if ( this.props.location.pathname === '/' ) {
      // TODO: cache default query (set up general caching strategy)
      this.props.clearFilters();
      this.props.languageUpdate( { display_name: 'English', key: 'en-us' } );
    }
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
        direction: getDirection( language )
      } );
      return ( languages[language] ) ? languages[language] : null;
    }
    return null;
  }

  handleQueryOnChange = async ( e ) => {
    const text = e.target.value;
    this.props.updateSearchQuery( text );
    this.fetchTextLanguage( text )
      .then( ( language ) => {
        if ( language ) {
          this.props.languageUpdate( language );
        }
      } )
      .catch( err => console.log( err ) );
  };

  handleSubmit = async ( e ) => {
    e.preventDefault();

    if ( this.props.search.query && this.props.search.query.trim() ) {
      this.props.updateSort( 'relevance' );
    } else {
      this.props.updateSort( 'published' );
    }
    await this.props.createRequest();
    this.props.loadSources();
    this.props.loadCategories();
    this.props.history.push( '/results' );
  };

  render() {
    let inputProps = {};
    if ( this.state.direction === 'left' ) {
      inputProps = { className: 'search_input' };
    } else {
      inputProps = { className: 'search_input right', iconPosition: 'left' };
    }

    return (
      <section className="search_bar">
        <Form onSubmit={ this.handleSubmit }>
          <Input
            onChange={ this.handleQueryOnChange }
            value={ this.props.search.query ? this.props.search.query : '' }
            size="large"
            icon={ <Icon name="search" onClick={ this.handleSubmit } /> }
            placeholder="Type in keywords to search our content"
            { ...inputProps }
          />
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

Search.propTypes = {
  updateSearchQuery: func,
  updateSort: func,
  createRequest: func,
  clearFilters: func,
  languageUpdate: func,
  loadSources: func,
  loadCategories: func,
  history: object,
  location: object,
  search: shape( {
    query: string
  } )
};

// wrap component in withRouter to get access to history
export default withRouter( connect( mapStateToProps, actions )( Search ) );

