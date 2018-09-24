/**
 *
 * VideoEditProject
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoEditProject from './selectors';

import './VideoEditProject.css';

/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  render() {
    return (
      <div>
        [ EDIT VIDEO PROJECT ]
      </div>
    );
  }
}

VideoEditProject.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoeditproject: makeSelectVideoEditProject()
} );

export default connect( mapStateToProps, actions )( VideoEditProject );
