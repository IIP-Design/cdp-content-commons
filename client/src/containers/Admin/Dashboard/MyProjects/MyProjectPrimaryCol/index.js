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
            onClick={ e => {              
              const parentTD = e.target.closest('.items_table_item');
              const dataActions = e.target.parentNode.parentNode.querySelector('.myProjects_data_actions_wrapper');
              
              parentTD.classList.toggle('displayDataActions');

              if ( parentTD.classList.contains('displayDataActions') ) {
                parentTD.style.zIndex = '3';
                dataActions.style.display = 'block';
              } else {
                parentTD.style.zIndex = '2';
                dataActions.style.display = 'none';                
              }              
            } }
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
