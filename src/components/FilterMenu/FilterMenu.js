import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './FilterMenu.css';

class FilterMenu extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      // subMenuVal: '',
      displaySubMenu: false
    };

    this.showSubMenu = this.showSubMenu.bind( this );
    this.closeSubMenu = this.closeSubMenu.bind( this );
  }

  componentWillMount() {
    this.props.loadLanguages();
    this.props.loadCategories();
    this.props.loadPostTypes();
    this.props.loadSources();
  }

  getOptions = ( type ) => {
    if ( !type.list.length ) return [];

    return type.list.map( item => ( {
      label: item.display,
      value: item.key,
      count: item.count,
      hasSubMenu: false
    } ) );
  };

  // TODO: make all prop names consistent
  updateSearchQuery = ( {
    filter, value, labelclean, checked
  } ) => {
    switch ( filter.toLowerCase() ) {
      case 'language':
        this.props.languageUpdate( { key: value, display_name: labelclean } );
        break;

      case 'category':
        this.props.categoryUpdate( { id: value, display_name: labelclean, checked } );
        break;

      case 'format':
        this.props.postTypeUpdate( { type: value, display_name: labelclean, checked } );
        break;

      case 'source':
        this.props.sourceUpdate( { key: value, display_name: labelclean, checked } );
        break;

      case 'most recent':
        this.props.dateUpdate( { key: value, display: labelclean } );
        break;

      default: {
        // console.log( 'in' );
      }
    }
    this.props.createRequest();
  };

  // state will reset if no selected value is sent
  handleFilterClearAll = () => {
    this.props.categoryUpdate();
    this.props.postTypeUpdate();
    this.props.sourceUpdate();
    this.props.languageUpdate();
    this.props.dateUpdate();
    this.props.createRequest();
  };

  handleFilterSelect = ( e, selected ) => {
    const filterSelection = e.target.previousSibling.value;
    // const hasParentMenu = e.target.parentNode.dataset.parentmenu ? e.target.parentNode.dataset.parentmenu : '';

    this.showSubMenu( filterSelection );
  };

  showSubMenu = ( filterSelection ) => {
    const activeSubMenu = document.querySelector( '.filterMenu_sub.show' );
    if ( !activeSubMenu ) {
      const subMenu = document.querySelector( `[data-submenu-for=${filterSelection}]` );
      if ( subMenu ) {
        // this.setState( { displaySubMenu: true, subMenuVal: filterSelection } );
      }
    }
  };

  closeSubMenu() {
    this.setState( { displaySubMenu: false } );
  }

  render() {
    return (
      <section className="filterMenu_wrapper">
        { /* SELECTION DISPLAY */ }
        <FilterSelections onFilterChange={ this.updateSearchQuery } onFilterClearAll={ this.handleFilterClearAll } />

        <div className={ this.state.displaySubMenu ? 'filterMenu_main subMenuDisplay' : 'filterMenu_main' }>
          { /*  MAIN-MENU */ }
          <FilterMenuItem
            filter="Most Recent"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.date.currentDate }
            closeSubMenu={ this.closeSubMenu }
            options={ this.getOptions( this.props.date ) }
          >
            <Form.Radio />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Format"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.type.currentPostTypes }
            closeSubMenu={ this.closeSubMenu }
            options={ this.getOptions( this.props.type ) }
          >
            <Form.Checkbox />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Source"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.source.currentSources }
            closeSubMenu={ this.closeSubMenu }
            options={ this.getOptions( this.props.source ) }
          >
            <Form.Checkbox />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Language"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.language.currentLanguage }
            options={ this.getOptions( this.props.language ) }
          >
            <Form.Radio />
          </FilterMenuItem>
          <FilterMenuItem
            filter="Category"
            onFilterChange={ this.updateSearchQuery }
            selected={ this.props.category.currentCategories }
            options={ this.getOptions( this.props.category ) }
          >
            <Form.Checkbox />
          </FilterMenuItem>
        </div>
      </section>
    );
  }
}

FilterMenu.propTypes = {
  loadLanguages: func,
  loadCategories: func,
  loadPostTypes: func,
  loadSources: func,
  languageUpdate: func,
  categoryUpdate: func,
  postTypeUpdate: func,
  sourceUpdate: func,
  dateUpdate: func,
  createRequest: func,
  language: object,
  category: object,
  type: object,
  source: object,
  date: object
};

const mapStateToProps = state => ( {
  search: state.search,
  language: state.language,
  category: state.category,
  type: state.type,
  source: state.source,
  date: state.date
} );

export default connect( mapStateToProps, actions )( FilterMenu );
