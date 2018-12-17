/**
 *
 * EditSingleProjectItem
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSingleProjectItem from './selectors';

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import './EditSingleProjectItem.css';

/* eslint-disable react/prefer-stateless-function */
class EditSingleProjectItem extends React.PureComponent {
  render() {
    return (
      <ModalItem
        customClassName="edit-project-item"
        headline="The Project Title"
        textDirection="ltr"
      >
        <p>Edit Single Project Item Component</p>
      </ModalItem>
    );
  }
}

EditSingleProjectItem.propTypes = {};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsingleprojectitem: makeSelectEditSingleProjectItem()
} );

export default connect( mapStateToProps, actions )( EditSingleProjectItem );
