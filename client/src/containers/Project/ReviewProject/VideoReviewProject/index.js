/**
 *
 * VideoReviewProject
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoReviewProject from './selectors';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Button } from 'semantic-ui-react';
import ProjectHeader from 'components/Project/ProjectHeader';
import VideoProjectData from './VideoProjectData';
import VideoSupportFiles from './VideoSupportFiles';
import VideoProjectFiles from './VideoProjectFiles';

import './VideoReviewProject.css';

const VideoReviewProject = ( props ) => {
  return (
    <Page title="Review Project" description="Review content project">
      <Breadcrumbs />
      <div className="review-project">
        <ProjectHeader icon="video camera" text="Project Details - Review">
            <Button>Delete Project</Button>
            <Button>Edit</Button>
            <Button>Preview Project</Button>
            <Button>Publish</Button>
        </ProjectHeader>
        
        <VideoProjectData />
        <VideoSupportFiles />
        <VideoProjectFiles />

        <section className="section section--publish">
          <h3 className="title">Your project looks great! Are you ready to Publish?</h3>
          <Button>Edit</Button>
          <Button>Publish</Button>
        </section>

      </div>
    </Page>
  );
}

VideoReviewProject.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoreviewproject: makeSelectVideoReviewProject()
} );

export default connect( mapStateToProps, actions )( VideoReviewProject );
