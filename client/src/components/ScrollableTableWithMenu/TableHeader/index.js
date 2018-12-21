/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import './TableHeader.css';

const TableHeader = props => {
  const { tableHeaders, column, direction, handleSort, toggleAllItemsSelection } = props;
  return (
    <Table.Header>
      <Table.Row>
        { tableHeaders.map( ( header, i ) => (
          <Table.HeaderCell 
            key={ i }
            sorted={ column === header.name ? direction : null }
            onClick={ handleSort( header.name )  }
          >
            { i === 0 
              ? <Checkbox label={ header.label } onChange={ toggleAllItemsSelection }/>
              : header.label
            }
          </Table.HeaderCell>
        ) ) }
      </Table.Row>
    </Table.Header>
  );
}

TableHeader.propTypes = {
  tableHeaders: PropTypes.array,
  column: PropTypes.string,
  direction: PropTypes.string,
  handleSort: PropTypes.func, 
  toggleAllItemsSelection: PropTypes.func 
};

export default TableHeader;
