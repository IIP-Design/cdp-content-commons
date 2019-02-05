/**
 *
 * MyProjects
 *
 */
import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectMyProjects from './selectors';
import { Table } from 'semantic-ui-react';
import ScrollableTableWithMenu from 'components/ScrollableTableWithMenu';
import TableMobileDataToggleIcon from 'components/ScrollableTableWithMenu/TableMobileDataToggleIcon';
import MyProjectPrimaryCol from './MyProjectPrimaryCol';
import './MyProjects.css';

import { tempData, menuItems } from './constants';

/* eslint-disable react/prefer-stateless-function */
class MyProjects extends React.Component {
  render() {
    const persistentTableHeaders = [
      { name: 'title', label: 'PROJECT TITLE'},
      { name: 'visibility', label: 'VISIBILITY' },
      { name: 'owner', label: 'OWNER' }
    ];

    return (
      <Fragment>
        <p className="myProjects_headline">Overview, Team Projects, Favorites, and Collections coming in future iterations!</p>
        <ScrollableTableWithMenu
          tableData={ tempData }
          columnMenu={ menuItems }
          persistentTableHeaders={ persistentTableHeaders }
          renderTableBody={ ({
            tableHeaders,
            selectedItems,
            data
          }, toggleItemSelection) => (
            <Table.Body className="myProjects">
              { data.map( d => (
                <Table.Row
                  key={ d.id }
                  className={ d.isNew ? 'myProjects_newItem' : '' }
                >
                  { tableHeaders.map( ( header, i ) => {
                    return (              
                      <Table.Cell
                        data-header={ header.label }
                        key={ `${d.id}_${header.name}` }
                        className="items_table_item"                          
                      >
                        { i === 0 && ( 
                          // Table must include .primary_col div for fixed column
                          <Fragment>
                            <div className="primary_col"> 
                              <MyProjectPrimaryCol
                                d={ d }
                                header={ header }
                                selectedItems={ selectedItems }
                                toggleItemSelection={ toggleItemSelection }
                              />
                            </div>
                            <TableMobileDataToggleIcon />
                          </Fragment>
                        ) }
                        { i !== 0 &&
                          <span><div className="items_table_mobileHeader">{ header.label }</div>{ d[header.name] }</span>
                        }
                      </Table.Cell>
                    )
                  } ) }
                </Table.Row>
              ) ) }
            </Table.Body>
          ) }
        />
      </Fragment>
    );
  }
}

MyProjects.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  myprojects: makeSelectMyProjects()
} );

export default connect( mapStateToProps, actions )( MyProjects );
