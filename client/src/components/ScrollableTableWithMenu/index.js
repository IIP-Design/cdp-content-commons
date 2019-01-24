/**
 *
 * ScrollableTableWithMenu
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { Table, Grid } from 'semantic-ui-react';
import { isMobile, isWindowWidthLessThanOrEqualTo } from '../../utils/browser';
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
    direction: null,
    windowWidth: ''
  };

  componentDidMount() {
    this.tableMenuSelectionsOnMobile();
    window.addEventListener( 'resize', this.tableMenuSelectionsOnResize );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.tableMenuSelectionsOnResize );
  }

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

  tableMenuSelectionsOnResize = () => {
    const { persistentTableHeaders, columnMenu } = this.props;
    const windowWidth = window.innerWidth;
    const prevWindowWidth = this.state.windowWidth;

    let resizeMenuSelectionsTimer;
    clearTimeout( resizeMenuSelectionsTimer );
    
    resizeMenuSelectionsTimer = setTimeout( () => {
      if ( prevWindowWidth !== '' && prevWindowWidth <= 767 && !isWindowWidthLessThanOrEqualTo( 767 ) ) {        
        return this.setState( { tableHeaders: persistentTableHeaders, windowWidth } );
      } else if ( isWindowWidthLessThanOrEqualTo( 767 ) ) {
        return this.setState( { tableHeaders: [ ...persistentTableHeaders, ...columnMenu ], windowWidth } );
      } else {
        return this.setState( { windowWidth } );
      }       
    }, 500 );
  }

  tableMenuSelectionsOnMobile = () => {
    const { columnMenu } = this.props;
    if ( isMobile() ) {  
      this.setState( prevState => {
        return {
          tableHeaders: [...prevState.tableHeaders, ...columnMenu ]
        }
      } );
    }
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
      direction
    } = this.state;

    const { columnMenu } = this.props;

    return (
      <Grid>
        <Grid.Row className="items_tableMenus">
          <TableItemsDisplay />
          <TableMenu
            columnMenu={ columnMenu }
            tableMenuOnChange={ this.tableMenuOnChange }
          />
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
