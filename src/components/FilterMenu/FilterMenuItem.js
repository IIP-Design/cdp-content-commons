import React, { Component } from 'react';
import { func, string, array, object, oneOfType } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import './FilterMenuItem.css';

class FilterMenuItem extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      filterItemOpen: false
    };
  }

  /**
   * Load external data
   */
  componentDidMount() {
    if ( typeof this.props.loadOptions === 'function' ) {
      this.props.loadOptions();
    }
  }

  /**
   * Format data into state that dopdowns will use
   */
  formatOptions = ( options, filter ) => {
    const filterOptions = options.map( option => ( {
      label: option.display_name,
      value: option.key,
      count: option.count
    } ) );

    return filterOptions;
  };

  displayFilter = () => {
    this.setState( { filterItemOpen: true }, () => {
      document.addEventListener( 'click', this.closeFilter );
    } );
  };

  closeFilter = ( e ) => {
    if ( this.filterMenu ) {
      if ( !this.filterMenu.contains( e.target ) || e.target.classList.contains( 'filterMenu_label' ) ) {
        this.setState( { filterItemOpen: false }, () => {
          document.removeEventListener( 'click', this.closeFilter );
        } );
      }
    }
  };

  updateFilters = ( filter ) => {
    switch ( filter.toLowerCase() ) {
      case 'source':
        this.props.loadCategories();
        break;
      case 'category':
        break;
      default:
        this.props.loadCategories();
        this.props.loadSources();
    }
  }

  handleOnChange = async ( e, selected ) => {
    const {
      value,
      checked,
      label,
      filter
    } = selected;

    this.props.onFilterChange( {
      key: value,
      display_name: label,
      checked
    } );

    await this.props.createRequest();

    this.updateFilters( filter );
  };

  render() {
    const { filterItemOpen } = this.state;
    const { FormItem, selected } = this.props;

    return (
      <div
        className="filterMenu"
        ref={ ( filterMenu ) => {
          this.filterMenu = filterMenu;
        } }
      >
        <span
          className={ filterItemOpen ? 'filterMenu_label active' : 'filterMenu_label' }
          onClick={ this.displayFilter }
          onKeyDown={ this.displayFilter }
          role="menuitem"
          tabIndex={ 0 }
        >
          { this.props.filter } <Icon name={ filterItemOpen ? 'chevron up' : 'chevron down' } />
        </span>
        <Form className={ filterItemOpen ? 'filterMenu_options show' : 'filterMenu_options' }>
          <Form.Group>
            { this.formatOptions( this.props.options, this.props.filter )
                .map( option => (
                  <FormItem
                    key={ option.value }
                    label={ option.label }
                    // labelWithCount={ option.count ? `${option.label} (${option.count})` : option.label }
                    value={ option.value }
                    filter={ this.props.filter }
                    count={ option.count }
                    onChange={ this.handleOnChange }
                    checked={
                      FormItem._meta.name === 'FormRadio'
                        ? selected.key === option.value
                        : selected.some( sel => sel.display_name === option.label )
                    }
                  />
                ) ) }
          </Form.Group>
        </Form>
      </div>
    );
  }
}

FilterMenuItem.propTypes = {
  FormItem: func,
  filter: string,
  options: array,
  selected: oneOfType( [array, object] ),
  onFilterChange: func,
  createRequest: func,
  loadSources: func,
  loadCategories: func,
  loadOptions: func
};

export default connect( null, actions )( FilterMenuItem );
