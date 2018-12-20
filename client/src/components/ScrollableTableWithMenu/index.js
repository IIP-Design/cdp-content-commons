/**
 *
 * ScrollableTableWithMenu
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { Table, Grid } from 'semantic-ui-react';
import TableItemsDisplay from './TableItemsDisplay';
import TableMenu from './TableMenu';
import TableHeader from './TableHeader';
import TableActionsMenu from './TableActionsMenu';
import './ScrollableTableWithMenu.css';

/* eslint-disable react/prefer-stateless-function */
class ScrollableTableWithMenu extends React.Component {
  state = {
    data: this.props.tableData,
    tableHeaders: this.props.persistentTableHeaders,        
    selectAllItems: false,
    selectedItems: new Map(),
    displayActionsMenu: false,
    column: null,
    direction: null
  };

  tableMenuOnChange = e => {    
    e.persist();
    const menuItem = {
      name: e.target.parentNode.dataset.propname,
      label: e.target.parentNode.dataset.proplabel
    };
    this.setState(prevState => {
      if ( prevState.tableHeaders.map( h => h.name ).includes( menuItem.name ) ) {
        return {
          tableHeaders: prevState.tableHeaders.filter( h => h.name !== menuItem.name )
        };
      } else {
        return { tableHeaders: [...prevState.tableHeaders, menuItem] };
      }
    });
  }

  toggleAllItemsSelection = e => {
    e.stopPropagation();
    const allItems = Array
      .from( document.querySelectorAll('[data-label]') )
      .map( item => item.dataset.label );

    const newSelectAllItemsState = !this.state.selectAllItems;
    let newSelectedItems = new Map();        
    
    allItems.forEach( item => {
      !newSelectAllItemsState
      ? newSelectedItems.set(item, false)
      : newSelectedItems.set(item, true)  
    } );
    
    this.setState({
      selectAllItems: newSelectAllItemsState,
      selectedItems: newSelectedItems,
      displayActionsMenu: newSelectAllItemsState ? true : false
    });
  }

  toggleItemSelection = (e, data) => {
    const isChecked = data.checked;
    this.setState( prevState => {
      const updatedSelectedItems = prevState.selectedItems.set(String(data['data-label']), isChecked);
      const areOtherItemsSelected = Array.from( updatedSelectedItems.values() ).includes( true );
      return {
        selectedItems: updatedSelectedItems,
        displayActionsMenu: areOtherItemsSelected ? true : false
      }
    } );
  }

  handleSort = clickedColumn => () => {    
    const { column, data, direction, displayActionsMenu } = this.state;

    if ( displayActionsMenu ) return;

    if (column !== clickedColumn) {
      return this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    const {
      tableHeaders,
      displayActionsMenu,
      column,
      direction,
    } = this.state;

    const { columnMenu } = this.props;

    return (
      <Grid>
        <Grid.Row className="items_tableMenus">
          <TableItemsDisplay />
          <TableMenu columnMenu={ columnMenu } tableMenuOnChange={ this.tableMenuOnChange } />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="items_table_wrapper">
            <TableActionsMenu displayActionsMenu={ displayActionsMenu }/>
            <div className="items_table">              
              <Table sortable celled>
                <TableHeader
                  tableHeaders={ tableHeaders }
                  column={ column }
                  direction={ direction }
                  handleSort={ this.handleSort }
                  toggleAllItemsSelection={ this.toggleAllItemsSelection }
                  displayActionsMenu={ displayActionsMenu }
                />

                {/* ADD CUSTOM TABLE BODY */}
                { this.props.renderTableBody(this.state, this.toggleItemSelection) }
              </Table>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

ScrollableTableWithMenu.propTypes = {
  tableData: PropTypes.array,
  persistentTableHeaders: PropTypes.array,
  columnMenu: PropTypes.array  
};

export default ScrollableTableWithMenu;