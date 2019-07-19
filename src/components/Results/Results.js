import React, { Component } from 'react';
import { shape, array, number, func } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SearchTerm from '../SearchTerm';
import Breadcrumbs from '../Breadcrumbs';
import FilterMenu from '../FilterMenu/FilterMenu';
import ResultsHeader from './ResultsHeader';
import ResultItem from './ResultItem';
import NoResults from './NoResults';
import ResultsPagination from './ResultsPagination';
import { Grid } from 'semantic-ui-react';
import { normalizeItem } from '../../utils/parser';
import './Results.css';

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      view: 'gallery'
    };
  }

  componentDidMount() {
    if ( !this.props.search.response.hits ) {
      // No current search and no saved session results so execute default search
      this.props.createRequest();
    }
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return this.props.search.response.hits !== nextProps.search.response.hits || this.state.view !== nextState.view;
  }

  toggleView = ( e ) => {
    const { view } = e.target.dataset;
    this.setState( { view } );
  };

  render() {
    const { view } = this.state;
    const { hits } = this.props.search.response;
    const items = hits ? hits.hits : [];
    return (
      <div className="ui container">
        <section className="results">
          <Breadcrumbs />
          { this.props.search.currentPage !== -1 && (
            <div>
              <SearchTerm />
              { !items.length && ( <NoResults searchTerm={ this.props.search.currentQuery } /> ) }
              <hr />
              <FilterMenu />
              <section>
                <ResultsHeader toggleView={ this.toggleView } currentView={ this.state.view } />
              </section>
              <Grid className="results_wrapper">
                { items.map( item => (
                  <Grid.Column
                    mobile={ 16 }
                    tablet={ view === 'gallery' ? 8 : 16 }
                    computer={ view === 'gallery' ? 4 : 16 }
                    className={
                      view === 'gallery' ? 'card_wrapper card_wrapper--gallery' : 'card_wrapper card_wrapper--list'
                    }
                    key={ item._id }
                  >
                    <ResultItem key={ item._id } item={ normalizeItem( item ) } />
                  </Grid.Column>
                ) ) }
              </Grid>
              <ResultsPagination />
            </div>
          ) }
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

Results.propTypes = {
  createRequest: func,
  search: shape( {
    response: shape( {
      hits: shape( {
        hits: array
      } )
    } ),
    currentPage: number
  } )
};

export default connect( mapStateToProps, actions )( Results );
