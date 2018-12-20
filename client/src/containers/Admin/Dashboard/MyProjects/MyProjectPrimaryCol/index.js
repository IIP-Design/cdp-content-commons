/**
 *
 * MyProjectPrimaryCol
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';
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
      <div className={
        props.d.visibility === 'publishing'
        ? 'myProjects_thumbnail myProjects_thumbnail--publishing'
        : 'myProjects_thumbnail'
        }
      >
        <img src={ props.d.thumbnail } alt={ props.d.title } />
      </div>
      <div className={
        props.d.visibility === 'publishing'
        ? 'myProjects_data myProjects_data--publishing'
        : 'myProjects_data'
        }
      >
        <h3 className="myProjects_data_title">{ props.d[props.header.name] }</h3>
        <div className="myProjects_data_actions">
          <Link to={ props.d.detailsLink } className="linkStyle">Details</Link>
          <span>&nbsp;|&nbsp;</span>
          <button className="linkStyle">Preview</button>
          <span>&nbsp;|&nbsp;</span>
          <button className="linkStyle">Share</button>
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
