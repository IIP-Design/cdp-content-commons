/**
 *
 * EditSingleProjectItem
 *
 */
import React from 'react';
import { object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSingleProjectItem from './selectors';

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import './EditSingleProjectItem.css';

/* eslint-disable react/prefer-stateless-function */
class EditSingleProjectItem extends React.PureComponent {
  render() {
    const { title, language } = this.props;
    return (
      <ModalItem
        customClassName="edit-project-item"
        headline={ title }
        textDirection={ language.text_direction }
      >
        <p>Edit Single Project Item Component</p>
      </ModalItem>
    );
  }
}

EditSingleProjectItem.propTypes = {
  title: string,
  language: object
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsingleprojectitem: makeSelectEditSingleProjectItem()
} );

export default connect( mapStateToProps, actions )( EditSingleProjectItem );
