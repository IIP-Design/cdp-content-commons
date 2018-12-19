/**
 *
 * TableActionsMenu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './TableActionsMenu.css';

/* eslint-disable react/prefer-stateless-function */
class TableActionsMenu extends React.Component {
  render() {
    const { displayActionsMenu } = this.props;
    return (
      <div className={ displayActionsMenu ? 'actionsMenu active' : 'actionsMenu' }>
        <Icon name='pencil' size='big' />
        <Icon name='trash' size='big' />
        <Icon name='eye' size='big' />
        <Icon name='plus square outline' size='big' />
        <Icon name='briefcase' size='big' />
        | <span>Unpublish</span>
      </div>
    );
  }
}

TableActionsMenu.propTypes = {};

export default TableActionsMenu;
