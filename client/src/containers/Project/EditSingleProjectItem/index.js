/**
 *
 * EditSingleProjectItem
 *
 */
import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSingleProjectItem from './selectors';

import './EditSingleProjectItem.css';

/* eslint-disable react/prefer-stateless-function */
class EditSingleProjectItem extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <article className="edit-project-item">
        <header className="header">
          <h2>{ title }</h2>
        </header>
        <p>Edit Single Project Item Component</p>
      </article>
    );
  }
}

EditSingleProjectItem.propTypes = {
  title: string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsingleprojectitem: makeSelectEditSingleProjectItem()
} );

export default connect( mapStateToProps, actions )( EditSingleProjectItem );
