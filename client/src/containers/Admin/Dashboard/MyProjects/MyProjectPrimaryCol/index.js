/**
 *
 * MyProjectPrimaryCol
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';
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
          { truncate(props.d[props.header.name], { length: 35 }) }
        </Link>
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
