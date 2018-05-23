import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterSelectionItem from './FilterSelectionItem';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import './FilterSelections.css';

class FilterSelections extends Component {
  state = {
    selections: []
  };

  componentWillReceiveProps( nextProps ) {
    const nextLanguage = nextProps.language.currentLanguage;
    const language = {
      label: nextLanguage.display_name,
      value: nextLanguage.key,
      filter: 'language',
      single: true
    };

    const nextDate = nextProps.date.currentDate;
    const date = {
      label: nextDate.display,
      value: nextDate.key,
      filter: 'date',
      single: true
    };

    const nextTypes = nextProps.type.currentPostTypes.map( item => ( {
      label: item.display_name,
      value: item.type,
      filter: 'format',
      single: false
    } ) );

    const nextCategories = nextProps.category.currentCategories.map( item => ( {
      label: item.display_name,
      value: item.id,
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
        language, date, ...nextTypes, ...nextCategories, ...nextSources
      ]
    }, this.saveToLocalStorage() );
  }

  saveToLocalStorage() {
    localStorage.setItem( 'selections', JSON.stringify( this.state.selections ) );
  }

  render() {
    const { selections } = this.state;

    return (
      <div className="filterMenu_selections">
        { selections.length > 0 &&
          selections.map( selection => (
            <FilterSelectionItem
              key={ selection.value }
              value={ selection.value }
              label={ selection.label }
              filter={ selection.filter }
              single={ selection.single }
              onClick={ this.props.onFilterChange }
            />
          ) ) }
        { selections.length > 0 && (
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
  language: object,
  category: object,
  type: object,
  source: object,
  date: object,
  onFilterChange: func,
  onFilterClearAll: func
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category,
  source: state.source,
  type: state.type,
  date: state.date
} );

export default connect( mapStateToProps, actions )( FilterSelections );
