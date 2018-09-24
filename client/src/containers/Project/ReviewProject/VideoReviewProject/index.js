/**
 *
 * VideoReviewProject
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { selectDisableRightClick, selectVideoReviewProject } from './selectors';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Button } from 'semantic-ui-react';
import ProjectHeader from 'components/Project/ProjectHeader';
import VideoProjectData from 'components/Project/ReviewProject/VideoProjectData';
import VideoSupportFiles from 'components/Project/ReviewProject/VideoSupportFiles';
import VideoProjectFiles from 'components/Project/ReviewProject/VideoProjectFiles';
import './VideoReviewProject.css';

class VideoReviewProject extends React.PureComponent {
  /* 
    TODO: PUBLISH_PROJECT_FN(), DELETE_PROJECT_FN()
  */

  toggleDisableRightClick = () => {
    this.props.toggleDisableRightClick( this.props.match.params.videoID );
  }

  handleOnPublish = () => {
    /* PUBLISH_PROJECT_FN() */
    
    // Using history.push instead of Redirect b/c back button not working w/ latter
    this.props.history.push("/admin/dashboard");
  }

  render() {
    const { videoReviewProject, disableRightClick } = this.props;
    const { videoID } = this.props.match.params;

    return (
      <Page title="Review Project" description="Review content project">
        <Breadcrumbs />
        <div className="review-project">
          <ProjectHeader icon="video camera" text="Project Details - Review">
              <Button>Delete Project</Button>
              <Button><Link to={ `/admin/video/${videoID}/edit` }>Edit</Link></Button>
              <Button>Preview Project</Button>
              <Button onClick={ this.handleOnPublish }>Publish</Button>
          </ProjectHeader>
          <VideoProjectData project_data={ videoReviewProject.project_data } />
          <VideoSupportFiles
            support_files={ videoReviewProject.support_files }
            disableRightClick={ disableRightClick }
            toggleDisableRightClick={ this.toggleDisableRightClick }
          />
          <VideoProjectFiles videos={ videoReviewProject.videos } />
          <section className="section section--publish">
            <h3 className="title">Your project looks great! Are you ready to Publish?</h3>
            <Button><Link to={ `/admin/video/${videoID}/edit` }>Edit</Link></Button>
            <Button onClick={ this.handleOnPublish }>Publish</Button>
          </section>
        </div>
      </Page>
    );
  }
}

VideoReviewProject.propTypes = {
  videoReviewProject: PropTypes.object
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoReviewProject: selectVideoReviewProject,
  disableRightClick: selectDisableRightClick
} );

export default connect( mapStateToProps, actions )( VideoReviewProject );
