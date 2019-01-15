/**
 *
 * TableMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Checkbox, Icon } from 'semantic-ui-react';
import { titleCase } from '../../../utils/helpers';
import './TableMenu.css';

class TableMenu extends React.Component {
  state = {
    displayTableMenu: false,
    menuHeaders: []
  }
  
  componentDidMount() {
    document.addEventListener( 'click', this.toggleTableMenu, false );
    
    this.props.tableDisplayAllData( this.props.columnMenu, () => {
      this.setState({ menuHeaders: [] });
    } );    
  }

  componentWillUnmount() {
    document.removeEventListener( 'click', this.toggleTableMenu, false );
  }

  toggleTableMenu = e => {
    const isTableMenu = e.target.dataset.tablemenu;
    const isTableMenuItem = e.target.parentNode.dataset.tablemenuitem;

    if ( isTableMenu ) {
      return this.setState( prevState => ({ displayTableMenu: !prevState.displayTableMenu }) );
    }

    if ( isTableMenuItem ) {
      return this.setState( prevState => ({ displayTableMenu: true }) );
    }

    this.setState( prevState => ({ displayTableMenu: false }) );
  }

  toggleCheckbox = ( e, data ) => {
    const selectedCheckbox = data[`data-proplabel`];
    const { menuHeaders } = this.state;

    if ( menuHeaders.includes( selectedCheckbox ) ) {
      this.setState( prevState => {
        return {
          menuHeaders: prevState.menuHeaders.filter( header => header !== selectedCheckbox )
        }
      });
    } else {
      this.setState( prevState => {
        return {
          menuHeaders: [...prevState.menuHeaders, selectedCheckbox]
        }
      });
    }
  }

  render() {
    const { displayTableMenu } = this.state;
    const { columnMenu, tableMenuOnChange } = this.props;

    return (
      <Grid.Column floated='right' mobile={ 16 } tablet={ 8 } desktop={ 8 } className="items_menu_wrapper">
        <div className={ displayTableMenu ? 'items_menu active' : 'items_menu' }>
          <span data-tablemenu>See More <Icon data-tablemenu name="angle down"/></span>          
          <span><Icon name="angle left" /></span>
          <span><Icon name="angle right" /></span>
          <div className={ displayTableMenu ? 'items_menu_list display' : 'items_menu_list' }>
            { columnMenu.map( item => (
              <Checkbox 
                data-tablemenuitem
                data-propname={ item.name }
                data-proplabel={ item.label }
                label={ titleCase( item.label ) }
                key={ item.name }
                onChange={ tableMenuOnChange }                
                onClick={ this.toggleCheckbox }
                checked={ this.state.menuHeaders.includes( item.label ) }
              />
            ) ) }
          </div>
        </div>
      </Grid.Column>
    );
  }
}

TableMenu.propTypes = {
  columnMenu: PropTypes.array,
  tableMenuOnChange: PropTypes.func
};

export default TableMenu;
