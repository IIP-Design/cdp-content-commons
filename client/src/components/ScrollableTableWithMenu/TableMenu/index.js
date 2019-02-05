/**
 *
 * TableMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Checkbox, Icon } from 'semantic-ui-react';
import { titleCase } from '../../../utils/helpers';
import { isMobile, isWindowWidthLessThanOrEqualTo } from '../../../utils/browser';
import './TableMenu.css';

class TableMenu extends React.Component {
  state = {
    displayTableMenu: false,
    menuHeaders: [],
    windowWidth: ''
  }
  
  componentDidMount() {    
    document.addEventListener( 'click', this.toggleTableMenu, false );
    this.menuHeadersOnMobile();
    window.addEventListener( 'resize', this.menuHeadersOnResize );
  }

  componentWillUnmount() {
    document.removeEventListener( 'click', this.toggleTableMenu, false );
    window.removeEventListener( 'resize', this.menuHeadersOnResize );
  }

  menuHeadersOnMobile = () => {
    const allMenuHeaders = this.props.columnMenu.map( menu => menu.label );    
    if ( isMobile() ) {
      this.setState({
        menuHeaders: [...allMenuHeaders]
      });
    }
  }

  menuHeadersOnResize = () => {
    const windowWidth = window.innerWidth;
    const prevWindowWidth = this.state.windowWidth;    

    let resizeMenuHeadersTimer;
    clearTimeout( resizeMenuHeadersTimer );
    
    resizeMenuHeadersTimer = setTimeout( () => {
      if ( prevWindowWidth !== '' && prevWindowWidth <= 767 && !isWindowWidthLessThanOrEqualTo( 767 ) ) {
        return this.setState( { menuHeaders: [], windowWidth } );
      } else if ( isWindowWidthLessThanOrEqualTo( 767 ) ) {
        const allMenuHeaders = this.props.columnMenu.map( menu => menu.label ); 
        return this.setState( { menuHeaders: [...allMenuHeaders], windowWidth } );
      } else {
        return this.setState( { windowWidth } );
      }
    }, 500 );
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

    return this.setState( prevState => ({ displayTableMenu: false }) );
  }

  toggleCheckbox = ( e, data ) => {
    const selectedCheckbox = data[`data-proplabel`];
    const { menuHeaders } = this.state;

    this.setState( prevState => {
      if ( menuHeaders.includes( selectedCheckbox ) ) {
        return {
          menuHeaders: prevState.menuHeaders.filter( header => header !== selectedCheckbox )
        }
      } else {
        return {
          menuHeaders: [...prevState.menuHeaders, selectedCheckbox]
        }
      }
    } );
  }

  render() {
    const { displayTableMenu, menuHeaders } = this.state;
    const { columnMenu, tableMenuOnChange } = this.props;

    return (
      <div className="items_menu_wrapper">
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
                checked={ menuHeaders.includes( item.label ) }
              />
            ) ) }
          </div>
        </div>
      </div>
    );
  }
}

TableMenu.propTypes = {
  columnMenu: PropTypes.array,
  tableMenuOnChange: PropTypes.func
};

export default TableMenu;
