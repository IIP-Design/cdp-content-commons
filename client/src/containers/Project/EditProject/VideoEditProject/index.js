/**
 *
 * VideoEditProject
 *
 */
import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoEditProject from './selectors';

import Page from 'components/Page';
import ProjectHeader from 'components/Project/ProjectHeader';
import Breadcrumbs from 'components/Breadcrumbs';
import VideoConfirmDelete from 'components/Project/ReviewProject/Video/VideoConfirmDelete';
import PreviewProject from 'components/Project/PreviewProject';
import PreviewProjectContent from 'components/Project/PreviewProjectContent';
import StatusMessages from 'components/Project/EditProject/StatusMessages';
import ProjectDataForm from 'components/Project/EditProject/ProjectDataForm';
import ProjectSupportFiles from 'components/Project/ProjectSupportFiles';
import ProjectItemsList from 'components/Project/ProjectItemsList';
import VideoItem from 'components/Project/Types/VideoItem';

import EditSingleProjectItem from 'containers/Project/EditSingleProjectItem';

import {
  Button,
  Confirm,
  Progress
} from 'semantic-ui-react';

import './VideoEditProject.css';
import {
  categoryData,
  privacyOptions,
  supportFilesConfig
} from './mockData';


/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  // use constructor instead?
  state = {
    deleteConfirmOpen: false,
    hasRequiredData: false,
    hasSubmittedData: false,
    isUploadInProgress: false,
    isUploadFinished: false,
    displayTheSaveMsg: false,
    displayTheUploadSuccessMsg: false,
    hasExceededMaxCategories: false,

    /**
     * Use redux for these?
     */
    formData: {
      title: '',
      privacySetting: 'anyone',
      author: '',
      owner: '',
      categories: [],
      tags: [],
      publicDesc: '',
      internalDesc: '',
      protectImages: true
    }
  }

  MAX_CATEGORY_COUNT = 2;

  displayConfirmDelete = () => {
    this.setState( { deleteConfirmOpen: true } );
  }

  handleDeleteConfirm = () => {
    this.setState( { deleteConfirmOpen: false } );
  }

  handleDeleteCancel = () => {
    this.setState( { deleteConfirmOpen: false } );
  }

  handleFinalReview = () => {
    const { videoID } = this.props.match.params;
    this.props.history.push( `/admin/video/${videoID}/review` );
  }

  handleAddMoreFiles = () => {
    console.log( 'Add more video files' );
  }

  handleUpload = () => {
    // need code to initiate upload,
    // then setState below when finished
    this.setState( {
      isUploadFinished: true,
      isUploadInProgress: false,
      displayTheUploadSuccessMsg: true
    } );

    setTimeout( () => {
      this.setState( { displayTheSaveMsg: false } );
    }, 2000 );

    setTimeout( () => {
      this.setState( { displayTheUploadSuccessMsg: false } );
    }, 3000 );
  }

  handleChange = ( e, { name, value, checked } ) => {
    this.setState( prevState => ( {
      formData: {
        ...prevState.formData,
        [name]: value || checked
      }
    } ) );
    this.setState( ( nextState ) => {
      const {
        categories,
        title,
        privacySetting
      } = nextState.formData;
      const categoryCount = categories.length;

      return ( {
        hasExceededMaxCategories: categoryCount > this.MAX_CATEGORY_COUNT,
        hasRequiredData: title && privacySetting && categoryCount > 0 && categoryCount <= this.MAX_CATEGORY_COUNT
      } );
    } );
  };

  handleSubmit = ( e ) => {
    e.preventDefault();

    const { protectImages, tags } = this.state.formData;

    this.setState( prevState => ( {
      hasSubmittedData: true,
      isUploadInProgress: true,
      displayTheSaveMsg: true,
      formData: {
        ...prevState.formData,
        tags: tags.length > 0 ? tags.split( /\s?[,;]\s?/ ) : tags,
        protectImages
      }
    } ) );

    // use setTimeout to simulate upload time
    setTimeout( this.handleUpload, 5000 );
    window.scroll( { top: 0, behavior: 'smooth' } );
  }

  render() {
    const projectData = this.props.videoEditProject;
    const {
      projectType,
      supportFiles,
      videos
    } = projectData;

    const {
      hasRequiredData,
      hasSubmittedData,
      isUploadInProgress,
      isUploadFinished,
      displayTheSaveMsg,
      displayTheUploadSuccessMsg,
      hasExceededMaxCategories,
      formData
    } = this.state;

    const {
      title,
      privacySetting,
      author,
      owner,
      categories,
      tags,
      publicDesc,
      internalDesc,
      protectImages
    } = formData;

    const pageTitle = `Project Details${hasSubmittedData ? ' - Edit' : ''}`;

    const contentStyle = {
      border: `${( hasRequiredData && hasSubmittedData ) ? 'none' : '3px solid #02bfe7'}`
    };

    const statusStyle = {
      backgroundColor: isUploadFinished ? '#f1f1f1' : '#02bfe7'
    };

    const notificationMsg = isUploadInProgress ? 'Saving project...' : 'Project saved as draft';

    return (
      <Page title="Edit Project" description="Edit content project">
        <Breadcrumbs />
        <div className="edit-project">
          <div className="edit-project__header">
            <ProjectHeader icon="video camera" text={ pageTitle }>
              <Button
                className="edit-project__btn--delete"
                content="Delete Project"
                basic
                onClick={ this.displayConfirmDelete }
                disabled={ !isUploadFinished }
              />
              <Confirm
                className="delete"
                open={ this.state.deleteConfirmOpen }
                content={ <VideoConfirmDelete /> }
                onCancel={ this.handleDeleteCancel }
                onConfirm={ this.handleDeleteConfirm }
                cancelButton="No, take me back"
                confirmButton="Yes, delete forever"
              />
              <PreviewProject
                triggerProps={ {
                  className: 'edit-project__btn--preview',
                  content: 'Preview Project',
                  basic: true,
                  disabled: !isUploadFinished
                } }
                contentProps={ {
                  data: projectData,
                  projecttype: `${projectType}s`
                } }
                modalTrigger={ Button }
                modalContent={ PreviewProjectContent }
              />
              <Button
                className="edit-project__btn--final-review"
                content="Final Review"
                onClick={ this.handleFinalReview }
                disabled={ !isUploadFinished }
              />
            </ProjectHeader>
          </div>

          <div className="edit-project__status" style={ isUploadInProgress ? null : statusStyle }>
            <StatusMessages
              hasSubmittedData={ hasSubmittedData }
              displayTheUploadSuccessMsg={ displayTheUploadSuccessMsg }
              displayTheSaveMsg={ displayTheSaveMsg }
              notificationMsg={ notificationMsg }
            />

            { isUploadInProgress &&
              <Progress
                // need to programmatically determine value & total
                value="8"
                total="11"
                color="blue"
                size="medium"
                active
                style={ { padding: '0' } }
              >
                <p style={ { marginBottom: '0' } }>
                  <span className="upload-status-label">Uploading files:</span> 8 of 11
                </p>
                <p>Please keep this page open until upload is complete</p>
              </Progress> }
          </div>

          <div className="edit-project__content" style={ contentStyle }>
            <ProjectDataForm
              handleSubmit={ this.handleSubmit }
              handleChange={ this.handleChange }

              videoTitle={ title || '' }
              privacyOptions={ privacyOptions }
              privacySetting={ privacySetting }

              authorValue={ author || '' }
              ownerValue={ owner || '' }

              categoryLabel={ `Categories - select up to ${this.MAX_CATEGORY_COUNT}` }
              categoryOptions={ categoryData }
              categoriesValue={ categories }
              hasExceededMaxCategories={ hasExceededMaxCategories }
              tagsValue={ tags || '' }

              publicDescValue={ publicDesc }
              internalDescValue={ internalDesc }

              // submit button props
              hasSubmittedData={ hasSubmittedData }
              hasRequiredData={ hasRequiredData }
            />
          </div>

          <div className="edit-project__support-files">
            <ProjectSupportFiles
              heading="Support Files"
              supportFiles={ supportFiles }
              hasSubmittedData={ hasSubmittedData }
              protectImages={ protectImages }
              handleChange={ this.handleChange }
              config={ supportFilesConfig }
            />
          </div>

          <div className="edit-project__items">
            <ProjectItemsList
              listEl="ul"
              data={ videos }
              headline="Videos in Project"
              hasSubmittedData={ hasSubmittedData }
              projectType="video"
              displayItemInModal
              modalTrigger={ VideoItem }
              modalContent={ EditSingleProjectItem }
            />

            { hasSubmittedData &&
              <div style={ { marginTop: '3rem' } }>
                <Button
                  className="edit-project__add-more"
                  content="+ Add more files to this project"
                  basic
                  onClick={ this.handleAddMoreFiles }
                />
              </div> }
          </div>
        </div>
      </Page>
    );
  }
}

VideoEditProject.propTypes = {
  history: object,
  match: object,
  videoEditProject: object
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoEditProject: makeSelectVideoEditProject()
} );

export default connect( mapStateToProps, actions )( VideoEditProject );