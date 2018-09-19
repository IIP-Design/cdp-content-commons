/**
 *
 * ReviewProject
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectReviewProject from './selectors';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Grid, Button, Checkbox, Icon } from 'semantic-ui-react';
import './ReviewProject.css';

import ProjectHeader from 'containers/Project/ProjectHeader';
import ProjectData from 'containers/Project/ProjectData';
import ProjectSupportFiles from 'containers/Project/ProjectSupportFiles';
import ProjectFiles from 'containers/Project/ProjectFiles';

const ReviewProject = ( props ) => {
  return (
    <Page title="Review Project" description="Review content project">
      <Breadcrumbs />
      <div className="review-project">
        <ProjectHeader icon="video camera" text="Project Details - Review" />
        <ProjectData />
        <ProjectSupportFiles />
        <ProjectFiles headline="VIDEOS IN PROJECT" />

        <section className="section section--publish">
          <h3 className="title">Your project looks great! Are you ready to Publish?</h3>
          <Button>Edit</Button>
          <Button>Publish</Button>
        </section>

      </div>
    </Page>
  );
}

ReviewProject.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  reviewproject: makeSelectReviewProject()
} );

export default connect( mapStateToProps, actions )( ReviewProject );
