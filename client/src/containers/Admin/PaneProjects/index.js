/**
 *
 * PaneProjects
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectPaneProjects from './selectors';
import './PaneProjects.css';

import { Table } from 'semantic-ui-react';


/* eslint-disable react/prefer-stateless-function */
class PaneProjects extends React.PureComponent {
  render() {
    return (
      <div className='dashboard_table'>        
      </div>
    );
  }
}

PaneProjects.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  paneprojects: makeSelectPaneProjects()
} );

export default connect( mapStateToProps, actions )( PaneProjects );
