import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterSelectionItem from './FilterSelectionItem';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import './FilterSelections.css';

class FilterSelections extends Component {
  state = {
    selections: []
  };

  componentWillReceiveProps( nextProps ) {
    const nextDate = nextProps.date.currentDate;
    const date = {
      label: nextDate.display_name,
      value: nextDate.key,
      filter: 'date',
      single: true
    };

    const nextTypes = nextProps.type.currentPostTypes.map( item => ( {
      label: item.display_name,
      value: item.key,
      filter: 'format',
      single: false
    } ) );

    const nextCategories = nextProps.category.currentCategories.map( item => ( {
      label: item.display_name,
      value: item.key,
      filter: 'category',
      single: false
    } ) );

    const nextSources = nextProps.source.currentSources.map( item => ( {
      label: item.display_name,
      value: item.display_name,
      filter: 'source',
      single: false
    } ) );

    this.setState( {
      selections: [
        date, ...nextTypes, ...nextCategories, ...nextSources
      ]
    } );
  }

  onFilterChange = ( {
    filter, value, label, checked
  } ) => {
    switch ( filter.toLowerCase() ) {
      case 'category':
        this.props.categoryUpdate( { key: value, display_name: label, checked } );
        break;

      case 'format':
        this.props.postTypeUpdate( { key: value, display_name: label, checked } );
        break;

      case 'source':
        this.props.sourceUpdate( { key: value, display_name: label, checked } );
        break;

      case 'date range':
        this.props.dateUpdate( { key: value, display_name: label } );
        break;

      default: {
        // console.log( 'no changes' );
      }
    }
    this.props.createRequest();
  };

  render() {
    const { selections } = this.state;

    if ( !selections.length ) {
      return <div />;
    }

    return (
      <div className="filterMenu_selections">
        { selections.map( selection => (
          <FilterSelectionItem
            key={ v4() }
            value={ selection.value }
            label={ selection.label }
            filter={ selection.filter }
            single={ selection.single }
            onClick={ this.onFilterChange }
          />
        ) ) }
        { selections.length > 2 && ( // need to update to > 2 as defaults to 2
          <div
            className="ui label clear_filter"
            onClick={ this.props.onFilterClearAll }
            onKeyDown={ this.props.onFilterClearAll }
            role="button"
            tabIndex={ 0 }
          >
            CLEAR ALL
          </div>
        ) }
      </div>
    );
  }
}

FilterSelections.propTypes = {
  category: object,
  type: object,
  source: object,
  date: object,
  onFilterClearAll: func,
  categoryUpdate: func,
  postTypeUpdate: func,
  sourceUpdate: func,
  dateUpdate: func,
  createRequest: func
};

const mapStateToProps = state => ( {
  search: state.search,
  category: state.category,
  source: state.source,
  type: state.type,
  date: state.date
} );

export default connect( mapStateToProps, actions )( FilterSelections );
