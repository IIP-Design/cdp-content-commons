/**
 *
 * TableItemsDisplay
 *
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './TableItemsDisplay.css';

const TableItemsDisplay = ( props ) => {
  return (
    <Grid.Column floated='left' mobile={ 16 } tablet={ 8 } desktop={ 8 } className="items_display">
      <div>Show: 25 &#9660; | 1-25 of 137 for 'search term'</div>
    </Grid.Column>
  );
}

TableItemsDisplay.propTypes = {};

export default TableItemsDisplay;
