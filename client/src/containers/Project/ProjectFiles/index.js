/**
 *
 * ProjectFiles
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectProjectFiles from './selectors';

import VideoProjectFile from 'components/Project/VideoProjectFile';

import './ProjectFiles.css';


/* eslint-disable react/prefer-stateless-function */
class ProjectFiles extends React.PureComponent {
  render() {
    return (
      <section className="section section--project_files project_files">
        <h3 className="project_files_headline">{ this.props.headline }</h3>
        <VideoProjectFile />
      </section>
    );
  }
}

ProjectFiles.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  projectfiles: makeSelectProjectFiles()
} );

export default connect( mapStateToProps, actions )( ProjectFiles );
