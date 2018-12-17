/**
 *
 * VideoReviewProject
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { selectDisableRightClick, selectVideoReviewProject } from './selectors';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Button, Confirm } from 'semantic-ui-react';
import ProjectHeader from 'components/Project/ProjectHeader';
import VideoProjectData from 'components/Project/ReviewProject/Video/VideoProjectData';
import VideoSupportFiles from 'components/Project/ReviewProject/Video/VideoSupportFiles';
import VideoProjectFiles from 'components/Project/ReviewProject/Video/VideoProjectFiles';
import VideoConfirmDelete from 'components/Project/ReviewProject/Video/VideoConfirmDelete';
import './VideoReviewProject.css';

class VideoReviewProject extends React.PureComponent {
  /* 
    TODO: PUBLISH_PROJECT_FN(), DELETE_PROJECT_FN()
  */

  state = {
    deleteConfirmOpen: false
  }

  displayConfirmDelete = () => {
    this.setState( { deleteConfirmOpen: true });
  }

  handleDeleteConfirm = () => {
    /* DELETE_PROJECT_FN() */
    this.setState( { deleteConfirmOpen: false }); 
  }

  handleDeleteCancel = () => {
    this.setState( { deleteConfirmOpen: false }); 
  }

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

    // TEMP - redirect to dashboard if project doesn't exist
    if ( videoReviewProject === null ) { return <Redirect to="/admin/dashboard" /> }

    return (
      <Page title="Review Project" description="Review content project">
        <Breadcrumbs />
        <div className="review-project">
          <ProjectHeader icon="video camera" text="Project Details - Review">
              <div className="button_column_wrapper">
                <div className="button_delete_wrapper">
                  <Button
                    className="project_button project_button--delete"
                    onClick={ this.displayConfirmDelete }
                  >
                    Delete Project
                  </Button>
                  <Confirm
                    className="delete"
                    open={ this.state.deleteConfirmOpen }
                    content={ <VideoConfirmDelete /> }
                    onCancel={ this.handleDeleteCancel }
                    onConfirm={ this.handleDeleteConfirm }
                    cancelButton="No, take me back"
                    confirmButton="Yes, delete forever"
                  />
                </div>
                <Button className="project_button project_button--edit"><Link to={ `/admin/video/${videoID}/edit` }>Edit</Link></Button>
              </div>
              <div className="button_column_wrapper">
                <Button className="project_button project_button--preview">Preview Project</Button>
                <Button className="project_button project_button--publish" onClick={ this.handleOnPublish }>Publish</Button>
              </div>
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
            <Button className="project_button project_button--edit"><Link to={ `/admin/video/${videoID}/edit` }>Edit</Link></Button>
            <Button className="project_button project_button--publish" onClick={ this.handleOnPublish }>Publish</Button>
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
