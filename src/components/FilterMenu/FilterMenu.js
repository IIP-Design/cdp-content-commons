import React, { Component } from 'react';
import { func, object } from 'prop-types';
import FilterMenuItem from './FilterMenuItem';
import FilterSelections from './FilterSelections';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './FilterMenu.css';

class FilterMenu extends Component {
  handleFilterClearAll = () => {
    this.props.categoryUpdate();
    this.props.postTypeUpdate();
    this.props.sourceUpdate();
    this.props.dateUpdate();

    this.props.createRequest();
  };

  render() {
    return (
      <section className="filterMenu_wrapper">
        { /* SELECTION DISPLAY */ }
        { <FilterSelections onFilterClearAll={ this.handleFilterClearAll } /> }

        <div className="filterMenu_main">
          { /*  MAIN-MENU */ }
          { /* Date */ }
          <FilterMenuItem
            filter="Date Range"
            selected={ this.props.date.currentDate }
            onFilterChange={ this.props.dateUpdate }
            options={ this.props.date.list }
            FormItem={ Form.Radio }
          />
          { /* Format */ }
          <FilterMenuItem
            filter="Format"
            selected={ this.props.type.currentPostTypes }
            onFilterChange={ this.props.postTypeUpdate }
            options={ this.props.type.list }
            loadOptions={ this.props.loadPostTypes }
            FormItem={ Form.Checkbox }
          />
          { /* Source */ }
          <FilterMenuItem
            filter="Source"
            selected={ this.props.source.currentSources }
            onFilterChange={ this.props.sourceUpdate }
            options={ this.props.source.list }
            loadOptions={ this.props.loadSources }
            FormItem={ Form.Checkbox }
          />
          { /* Language */ }
          { /* <FilterMenuItem
            filter="Language"
            selected={ this.props.language.currentLanguage }
            onFilterChange={ this.props.languageUpdate }
            options={ this.props.language.list }
            loadOptions={ this.props.loadLanguages }
            FormItem={ Form.Radio }
          /> */ }
          { /* Category */ }
          <FilterMenuItem
            filter="Category"
            selected={ this.props.category.currentCategories }
            onFilterChange={ this.props.categoryUpdate }
            options={ this.props.category.list }
            loadOptions={ this.props.loadCategories }
            FormItem={ Form.Checkbox }
          />
        </div>
      </section>
    );
  }
}

FilterMenu.propTypes = {
  loadCategories: func,
  loadPostTypes: func,
  loadSources: func,
  categoryUpdate: func,
  postTypeUpdate: func,
  sourceUpdate: func,
  dateUpdate: func,
  createRequest: func,
  category: object,
  type: object,
  source: object,
  date: object
};

const mapStateToProps = state => ( {
  search: state.search,
  category: state.category,
  type: state.type,
  source: state.source,
  date: state.date
} );

export default connect( mapStateToProps, actions )( FilterMenu );
