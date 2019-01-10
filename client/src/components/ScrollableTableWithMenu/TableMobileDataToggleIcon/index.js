/**
 *
 * TableMobileDataToggleIcon
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './TableMobileDataToggleIcon.css';

/* eslint-disable react/prefer-stateless-function */
class TableMobileDataToggleIcon extends React.Component {
  state = {
    mobileDataToggleIcon: 'plus'
  }

  componentDidUpdate() {
    const activeTableRows = document.querySelectorAll('.activeTableRow');
    activeTableRows.forEach( tr => {
      const tableRowData = Array.from(tr.childNodes).splice(1);
      tableRowData.forEach( td => td.classList.add( 'display' ) );
    } );
  }

  toggleMobileData = e => {
    e.persist();
    const DOMactiveTableRow = e.target.parentNode.parentNode;    
    const tableRowData = Array.from(DOMactiveTableRow.childNodes).splice(1);
    
    DOMactiveTableRow.classList.toggle('activeTableRow');

    tableRowData.forEach( td => {        
      td.classList.contains( 'display' )
      ? td.classList.remove( 'display' )
      : td.classList.add( 'display' )
    });

    this.setState( prevState => ({
      mobileDataToggleIcon: prevState.mobileDataToggleIcon === 'plus'
      ? 'minus'
      : 'plus'
    } ) );

  }

  render() {
    const { mobileDataToggleIcon } = this.state;
    return (
      <Icon
        name={ mobileDataToggleIcon }
        className="items_table_mobileDataToggleIcon"
        onClick={ this.toggleMobileData }
      />
    );
  }
}

TableMobileDataToggleIcon.propTypes = {};

export default TableMobileDataToggleIcon;
