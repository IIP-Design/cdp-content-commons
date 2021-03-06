import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { func, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form, Input, Icon, Dropdown } from 'semantic-ui-react';
import config from '../../config';
import './Search.css';


// Text language detect - move to v2
// import axios from 'axios';
// import { languages, getDirection } from '../../utils/language';
import { getDirection } from '../../utils/language';

class Search extends Component {
  constructor( props ) {
    super( props );
    this.URL = `${config.GOOGLE_LANGUAGE_DETECT_URL}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    const { location, language } = this.props;
    this.state = {
      direction: 'left',
      currentLang: location.pathname === '/' ? 'en-us' : language.currentLanguage.key
    };
  }

  componentDidMount() {
    // Clear session if not on results page
    if ( this.props.location.pathname !== '/results' ) {
      // TODO: cache default query (set up general caching strategy)
      this.props.clearFilters();
      this.props.languageUpdate( { display_name: 'English', key: 'en-us' } );
      this.props.loadLanguages();
    }
  }

  getDetections = ( result ) => {
    if ( result && result.data && result.data.data && result.data.data.detections ) {
      const { detections } = result.data.data;
      return detections.length && detections[0].length ? detections[0][0].language : null;
    }
    return null;
  }

  // async fetchTextLanguage( text ) {
  //   const result = await axios.post( `${this.URL}&q=${text}` );
  //   const language = this.getDetections( result );

  //   if ( language ) {
  //     this.setState( {
  //       direction: getDirection( language ),
  //       currentLang: language.key
  //     } );
  //     return ( languages[language] ) ? languages[language] : null;
  //   }
  //   return null;
  // }

  handleLangOnChange = ( e, data ) => {
    this.setState( {
      direction: getDirection( data.value ),
      currentLang: data.value
    } );
  }

  handleQueryOnChange = async ( e ) => {
    const text = e.target.value;
    this.props.updateSearchQuery( text );
    // this.fetchTextLanguage( text )
    //   .then( ( language ) => {
    //     if ( language ) {
    //       this.props.languageUpdate( language );
    //     }
    //   } )
    //   .catch( err => console.log( err ) );
  };

  handleSubmit = async ( e ) => {
    e.preventDefault();

    this.props.languageUpdate( { key: this.state.currentLang } );

    if ( this.props.search.query && this.props.search.query.trim() ) {
      this.props.updateSort( 'relevance' );
    } else {
      this.props.updateSort( 'published' );
    }
    await this.props.createRequest();
    this.props.history.push( '/results' );

    this.props.loadSources();
    this.props.loadCategories();
  };

  render() {
    let inputProps = {};
    if ( this.state.direction === 'left' ) {
      inputProps = { className: 'search_input' };
    } else {
      inputProps = { className: 'search_input right', iconPosition: 'left', labelPosition: 'right' };
    }

    let langOptions = this.props.language.list.map( l => ( {
      key: l.key,
      text: l.display_name,
      value: l.key
    } ) );

    if ( langOptions.length === 0 ) langOptions = [{ key: 'en-us', text: 'English', value: 'en-us' }];

    return (
      <section className="search_bar">
        <Form onSubmit={ this.handleSubmit }>
          <Input
            label={
              <Dropdown
                value={ this.state.currentLang }
                options={ langOptions }
                onChange={ this.handleLangOnChange }
              />
            }
            labelPosition="left"
            onChange={ this.handleQueryOnChange }
            value={ this.props.search.query ? this.props.search.query : '' }
            size="large"
            icon={ <Icon name="search" onClick={ this.handleSubmit } /> }
            placeholder="Type in keywords to search"
            { ...inputProps }
          />
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language
} );

Search.propTypes = {
  updateSearchQuery: func,
  updateSort: func,
  createRequest: func,
  clearFilters: func,
  languageUpdate: func,
  loadLanguages: func,
  loadSources: func,
  loadCategories: func,
  history: object,
  location: object,
  language: object,
  search: shape( {
    query: string
  } )
};

// wrap component in withRouter to get access to history
export default withRouter( connect( mapStateToProps, actions )( Search ) );

