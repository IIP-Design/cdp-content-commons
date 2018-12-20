/**
 *
 * TableActionsMenu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import editIcon from 'assets/images/Dashboard/edit.svg'
import createIcon from 'assets/images/Dashboard/create.svg'
import deleteIcon from 'assets/images/Dashboard/delete.svg'
import archiveIcon from 'assets/images/Dashboard/archive.svg'
import unpublishIcon from 'assets/images/Dashboard/unpublish.svg'
import './TableActionsMenu.css';

/* eslint-disable react/prefer-stateless-function */
class TableActionsMenu extends React.Component {
  render() {
    const { displayActionsMenu } = this.props;
    return (
      <div className={ displayActionsMenu ? 'actionsMenu active' : 'actionsMenu' }>
        <img src={ editIcon } alt='Edit Selection(s)' title='Edit Selection(s)'/>
        <img src={ deleteIcon } alt='Delete Selection(s)' title='Delete Selection(s)'/>
        <img src={ unpublishIcon } alt='Unpublish Selection(s)' title='Unpublish Selection(s)'/>
        <img src={ createIcon } alt='Create Selection(s)' title='Create Selection(s)'/>
        <img src={ archiveIcon } alt='Archive Selection(s)' title='Archive Selection(s)'/>        
        <div className="unpublish">|<span className="unpublish--text">Unpublish</span></div>
      </div>
    );
  }
}

TableActionsMenu.propTypes = {};

export default TableActionsMenu;
