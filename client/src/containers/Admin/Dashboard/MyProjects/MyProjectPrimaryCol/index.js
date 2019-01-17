/**
 *
 * MyProjectPrimaryCol
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox, Icon } from 'semantic-ui-react';
import truncate from 'lodash/truncate';
import './MyProjectPrimaryCol.css';

const toggleDataActions = e => {
  // Select target table td element
  const parentTD = e.target.closest('.items_table_item');

  if ( parentTD.classList.contains('displayDataActions') ) {
    parentTD.classList.remove('displayDataActions');    
  } else {
    // Close any other open dataActions menus
    const openDataActionsMenu = document.querySelector('.displayDataActions');
    if ( openDataActionsMenu !== null ) openDataActionsMenu.classList.remove('displayDataActions');

    // Display target dataActions menu
    parentTD.classList.add('displayDataActions');
  }
}

const MyProjectPrimaryCol = ( props ) => {
  return (
    <Fragment>
      <div className="myProjects_actions">
        <Checkbox                           
          data-label={ props.d.id }
          checked={ props.selectedItems.get( `${props.d.id}` ) }
          onChange={ props.toggleItemSelection }
        />
        {/* <div className="myProjects_favorite"><Icon name='star' /></div> */}
      </div>
      <div className="myProjects_thumbnail">
        <img src={ props.d.thumbnail } alt={ props.d.title } />
      </div>
      <div className="myProjects_data">
        <Link
          to={ `/admin/projects/${props.d[props.header.name]}` }
          className="myProjects_data_title"
          title={ props.d[props.header.name] }
        >
          { truncate( props.d[props.header.name], { length: 35 } ) }
        </Link>
        <div className="myProjects_data_actions">
          <div className="myProjects_data_actions_wrapper">
            <Link to={ props.d.detailsLink } className="linkStyle myProjects_data_actions_action">Details</Link>
            <span>{ ' | ' }</span>
            <button className="linkStyle myProjects_data_actions_action">Preview</button>
            <span>{ ' | ' }</span>
            <button className="linkStyle myProjects_data_actions_action">Share</button>
          </div>
          <button
            className="linkStyle myProjects_data_actions_mobileToggle"
            onClick={ toggleDataActions }
          >
            <Icon name="ellipsis vertical" />
          </button>
        </div>
      </div>
    </Fragment>
  );
}

MyProjectPrimaryCol.propTypes = {
  d: PropTypes.object,
  header: PropTypes.object,
  selectedItems: PropTypes.instanceOf(Map),
  toggleItemSelection: PropTypes.func
};

export default MyProjectPrimaryCol;
