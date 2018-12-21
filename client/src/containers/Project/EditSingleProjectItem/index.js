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

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import VideoEditVideo from '../EditProject/VideoEditVideo';

import './EditSingleProjectItem.css';

/* eslint-disable react/prefer-stateless-function */
class EditSingleProjectItem extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <ModalItem
        customClassName="edit-project-item"
        headline={ title }
        textDirection="ltr"
      >
        <VideoEditVideo data={ this.props } />
      </ModalItem>
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
