/**
 *
 * ProjectsItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import './ProjectsItem.css';

const ProjectsItem = ( props ) => {
  const { item } = props;

  return (
    <Table.Row key={ item.id } className="projects_item">
      <Table.Cell>
        <div>
          <div className="projImage" style={ { backgroundImage: `url( ${item.thumbnail} )` } }>
            <img src={ item.icon } className="metaicon" alt={ `${item.postType} icon` } />
          </div>
          <div className="projDetails">
            <h3>{ item.title }</h3>
            <div>
              <span>Details </span>
              | <span>Preview </span>
              | <span>Share</span>
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell><span className="mobileLabel">Visibility: </span>{ item.visibility }</Table.Cell>
      <Table.Cell><span className="mobileLabel">Date Created: </span>{ moment( item.dateCreated ).format( 'MMMM DD, YYYY' ) }</Table.Cell>
      <Table.Cell><span className="mobileLabel">Author: </span>{ item.author }</Table.Cell>
      <Table.Cell><span className="mobileLabel">Owner: </span>{ item.owner }</Table.Cell>
    </Table.Row>
  );
};

ProjectsItem.propTypes = {
  item: PropTypes.object
};

export default ProjectsItem;
