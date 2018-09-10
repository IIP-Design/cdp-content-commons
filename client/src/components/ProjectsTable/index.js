/**
 *
 * ProjectsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import ProjectsItem from 'components/ProjectsItem';
import './ProjectsTable.css';

const headers = [
  { key: 1, name: 'title', label: 'Title' },
  { key: 2, name: 'visibility', label: 'Visibility' },
  { key: 3, name: 'dateCreated', label: 'Date Created' },
  { key: 4, name: 'author', label: 'Author' },
  { key: 5, name: 'owner', label: 'Owner' }
];

/* eslint-disable react/prefer-stateless-function */
class ProjectsTable extends React.PureComponent {
  state = {
    column: null,
    data: _.sortBy( this.props.data, 'dateCreated' ).reverse(),
    direction: null
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if ( column !== clickedColumn ) {
      this.setState( {
        column: clickedColumn,
        data: _.sortBy( data, [clickedColumn] ),
        direction: 'ascending'
      } );

      return;
    }

    this.setState( {
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    } );
  }

  render() {
    const { column, data, direction } = this.state;

    return (
      <section className="projects_table">
        <Table sortable padded="very">
          <Table.Header>
            <Table.Row className="projects_table--header">
              { headers.map( header => (
                <Table.HeaderCell
                  key={ header.key }
                  className="projects_table--headerCell"
                  sorted={ column === header.name ? direction : null }
                  onClick={ this.handleSort( header.name ) }
                >
                  { header.label }
                </Table.HeaderCell>
              ) ) }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { data.map( item => (
              <ProjectsItem key={ item.id } item={ item } />
            ) ) }
          </Table.Body>
        </Table>
      </section>
    );
  }
}

ProjectsTable.propTypes = {
  data: PropTypes.array
};

export default ProjectsTable;
