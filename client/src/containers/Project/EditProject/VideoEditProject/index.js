/**
 *
 * VideoEditProject
 *
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import {
  makeSelectCurrentVideoEditProject,
  makeUploadedVideoProjectItemsCount,
  makeUploadedSupportFilesCount
} from './selectors';
import { Button, Confirm, Loader, Progress } from 'semantic-ui-react';

import Page from 'components/Page';
import ProjectHeader from 'components/Project/ProjectHeader';
import Breadcrumbs from 'components/Breadcrumbs';
import ConfirmationModalContent from 'components/Project/ConfirmationModalContent';
import PreviewProject from 'components/Project/PreviewProject';
import PreviewProjectContent from 'components/Project/PreviewProjectContent';
import FormInstructions from 'components/Project/EditProject/FormInstructions';
import UploadSuccessMsg from 'components/Project/EditProject/UploadSuccessMsg';
import ProjectDataForm from 'components/Project/EditProject/ProjectDataForm';
import ProjectSupportFiles from 'components/Project/ProjectSupportFiles';
import ProjectItemsList from 'components/Project/ProjectItemsList';
import VideoItem from 'containers/Project/Types/VideoItem';
import Notification from 'components/Project/Notification/Loadable';

import EditSingleProjectItem from 'containers/Project/EditSingleProjectItem';

import { ScrollToTop } from '../../../../utils/helpers';
import colors from '../../../../utils/colors';

import './VideoEditProject.css';
import {
  categoryData,
  privacyOptions,
  supportFilesConfig
} from '../../mockData';


/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  state = {
    deleteConfirmOpen: false,
    hasBeenDeleted: false,
    hasRequiredData: false,
    hasSubmittedData: false,
    isUploadInProgress: false,
    isUploadFinished: false,
    hasUnsavedData: false,
    displaySaveMsg: false,
    displayTheUploadSuccessMsg: false,
    hasExceededMaxCategories: false,
    filesToUploadCount: 0,
    formData: {
      title: '',
      privacySetting: 'anyone',
      author: '',
      owner: '',
      categories: [],
      tags: [],
      publicDesc: '',
      internalDesc: '',
      termsConditions: false,
      protectImages: true
    }
  }

  componentWillMount = () => {
    const projectId = this.props.match.params.videoID;
    const videosCount = this.props.project.videos.length;

    this.props.loadVideoProjects( projectId );
    this.setState( {
      filesToUploadCount: videosCount + this.getSupportFilesCount()
    } );
  }

  componentDidUpdate = ( prevProps, prevState ) => {
    const uploadedCount = this.getUploadedFilesCount();

    if ( uploadedCount === prevState.filesToUploadCount && prevState.hasSubmittedData && !prevState.isUploadFinished ) {
      this.setState( {
        isUploadFinished: true,
        isUploadInProgress: false,
        displayTheUploadSuccessMsg: true,
        displaySaveMsg: true
      } );

      this.delayUnmount( this.handleDisplaySaveMsg, 'saveMsgTimer', 2000 );
      this.delayUnmount( this.handleDisplayUploadSuccessMsg, 'uploadSuccessTimer', 3000 );
    }
  }

  componentWillUnmount = () => {
    clearTimeout( this.uploadSuccessTimer );
    clearTimeout( this.saveMsgTimer );
  }

  getSupportFilesCount = () => {
    const { supportFiles } = this.props.project;
    const types = Object.keys( supportFiles );
    const count = ( acc, cur ) => acc + supportFiles[cur].length;
    return types.reduce( count, 0 );
  }

  getUploadedFilesCount = () => {
    const { uploadedVideosCount, uploadedSupportFilesCount } = this.props;
    return uploadedVideosCount + uploadedSupportFilesCount;
  }

  getTags = () => {
    const { tags } = this.state.formData;
    const tagsArray = ( tags && tags.length > 0 && !Array.isArray( tags ) ) ? tags.split( /\s?[,;]\s?/ ) : tags;

    if ( tagsArray && Array.isArray( tagsArray ) ) {
      return tagsArray
        .map( tag => tag.trim() )
        .filter( tag => /\S/.test( tag ) );
    }
    return [];
  }

  delayUnmount = ( fn, timer, delay ) => {
    if ( this[timer] ) clearTimeout( this[timer] );
    this[timer] = setTimeout( fn, delay );
  }

  MAX_CATEGORY_COUNT = 2;

  displayConfirmDelete = () => {
    this.setState( { deleteConfirmOpen: true } );
  }

  handleDeleteConfirm = () => {
    const { videoID } = this.props.match.params;
    this.props.deleteVideoProject( videoID );
    console.log( `Deleted "${videoID}" project` );
    this.setState( {
      deleteConfirmOpen: false,
      hasBeenDeleted: true
    } );
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
    this.addMoreInputRef.click();
  }

  handleAddMoreRef = ( c ) => {
    this.addMoreInputRef = c;
  }

  handleSaveDraft = ( e ) => {
    console.log( 'Draft saved' );
    this.handleSubmit( e );
  }

  handleSaveProjectData = () => {
    const { videoID } = this.props.match.params;
    this.props.saveProjectData( videoID, this.state.formData );
  }

  handleUpload = () => this.setState( { isUploadInProgress: true } );

  handleChange = ( e, { name, value, checked } ) => {
    if ( typeof value === 'string' ) {
      value = value.trimStart();
    }

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
        privacySetting,
        termsConditions
      } = nextState.formData;
      const categoryCount = categories.length;

      return ( {
        hasUnsavedData: true,
        hasExceededMaxCategories: categoryCount > this.MAX_CATEGORY_COUNT,
        hasRequiredData: title &&
          privacySetting &&
          categoryCount > 0 &&
          categoryCount <= this.MAX_CATEGORY_COUNT &&
          termsConditions
      } );
    } );
  };

  handleSubmit = ( e ) => {
    e.preventDefault();
    const {
      title,
      author,
      owner,
      publicDesc,
      internalDesc,
      termsConditions,
      protectImages
    } = this.state.formData;

    this.setState(
      prevState => ( {
        hasSubmittedData: true,
        hasUnsavedData: false,
        displaySaveMsg: true,
        formData: {
          ...prevState.formData,
          title: title ? title.trimEnd() : '',
          author: author ? author.trimEnd() : '',
          owner: owner ? owner.trimEnd() : '',
          publicDesc: publicDesc ? publicDesc.trimEnd() : '',
          internalDesc: internalDesc ? internalDesc.trimEnd() : '',
          tags: this.getTags(),
          termsConditions,
          protectImages
        }
      } ),
      this.handleSaveProjectData
    );

    if ( !this.state.isUploadFinished ) {
      this.handleUpload();
    } else {
      this.delayUnmount( this.handleDisplaySaveMsg, 'saveMsgTimer', 2000 );
    }

    ScrollToTop( { top: 0, behavior: 'smooth' } );
  }

  handleDisplayUploadSuccessMsg = () => {
    this.setState( { displayTheUploadSuccessMsg: false } );
    this.uploadSuccessTimer = null;
  }

  handleDisplaySaveMsg = () => {
    this.setState( { displaySaveMsg: false } );
    this.saveMsgTimer = null;
  }

  render() {
    const { project, uploadedSupportFilesCount } = this.props;

    if ( !project && this.state.hasBeenDeleted ) {
      return <Redirect to="/admin/dashboard" />;
    }

    if ( !project || project.loading ) {
      return (
        <div style={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          } }
        >
          <Loader active inline="centered" style={ { marginBottom: '1em' } } />
          <p>Loading the project...</p>
        </div>
      );
    }

    const {
      projectType,
      supportFiles,
      videos
    } = project;

    const {
      hasRequiredData,
      hasSubmittedData,
      isUploadInProgress,
      isUploadFinished,
      hasUnsavedData,
      displaySaveMsg,
      displayTheUploadSuccessMsg,
      hasExceededMaxCategories,
      formData,
      filesToUploadCount
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
      termsConditions,
      protectImages
    } = formData;

    const formBorderColor = `${!hasSubmittedData ? colors.brightBlue : colors.red}`;
    const contentStyle = {
      border: `3px solid ${( hasRequiredData && hasSubmittedData ) ? 'transparent' : `${formBorderColor}`}`
    };

    let notificationMsg = 'Project saved as draft';
    if ( hasSubmittedData && hasUnsavedData && !hasRequiredData ) {
      notificationMsg = 'Please fill in required data';
    } else if ( hasSubmittedData && hasUnsavedData ) {
      notificationMsg = 'You have unsaved data';
    } else if ( isUploadInProgress ) {
      notificationMsg = 'Saving project...';
    }

    return (
      <Page title="Edit Project" description="Edit content project">
        <Breadcrumbs />
        <div className="edit-project">
          <div className="edit-project__header">
            <ProjectHeader icon="video camera" text="Project Details">
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
                content={
                  <ConfirmationModalContent
                    className="delete_confirm delete_confirm--video"
                    headingTxt="Are you sure you want to delete this video project?"
                  >
                    <p>This video project will be permanently removed from the Content Cloud. Any videos that you uploaded here will not be uploaded.</p>
                  </ConfirmationModalContent>
                }
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
                  data: project,
                  projecttype: `${projectType}s`
                } }
                modalTrigger={ Button }
                modalContent={ PreviewProjectContent }
              />
              { hasSubmittedData &&
                <Button
                  className="edit-project__btn--save-draft"
                  content="Save Draft"
                  basic
                  onClick={ this.handleSaveDraft }
                  disabled={ !isUploadFinished || !hasUnsavedData || !hasRequiredData }
                /> }
              <Button
                className="edit-project__btn--final-review"
                content="Final Review"
                onClick={ this.handleFinalReview }
                disabled={ !isUploadFinished }
              />
            </ProjectHeader>
          </div>

          <div className="edit-project__status alpha">
            { !hasSubmittedData && <FormInstructions /> }
            { displayTheUploadSuccessMsg && <UploadSuccessMsg /> }

            { ( displaySaveMsg || ( hasUnsavedData && hasSubmittedData ) ) &&
              <Notification
                el="p"
                customStyles={ {
                  position: 'absolute',
                  top: '10.75em',
                  left: '50%',
                  transform: 'translateX(-50%)'
                  } }
                msg={ notificationMsg }
              /> }

            { isUploadInProgress &&
              <Progress
                value={ this.getUploadedFilesCount() }
                total={ filesToUploadCount }
                color="blue"
                size="medium"
                active
              >
                <p>
                  <b>Uploading files:</b> { this.getUploadedFilesCount() } of { filesToUploadCount }
                  <br />
                  Please keep this page open until upload is complete
                </p>
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

              categoryLabel="Categories"
              maxCategories={ this.MAX_CATEGORY_COUNT }
              categoryOptions={ categoryData }
              categoriesValue={ categories }
              hasExceededMaxCategories={ hasExceededMaxCategories }
              tagsValue={ tags || '' }

              publicDescValue={ publicDesc }
              internalDescValue={ internalDesc }
              termsConditions={ termsConditions }

              hasSubmittedData={ hasSubmittedData }
              hasRequiredData={ hasRequiredData }
            />
          </div>

          <div className="edit-project__status beta">
            { !hasSubmittedData && <FormInstructions /> }
            { displayTheUploadSuccessMsg && <UploadSuccessMsg /> }

            { isUploadInProgress &&
              <Progress
                value={ this.getUploadedFilesCount() }
                total={ filesToUploadCount }
                color="blue"
                size="medium"
                active
              >
                <p>
                  <b>Uploading files:</b> { this.getUploadedFilesCount() } of { filesToUploadCount }
                  <br />
                  Please keep this page open until upload is complete
                </p>
              </Progress> }
          </div>

          <div className="edit-project__support-files">
            <ProjectSupportFiles
              heading="Support Files"
              projectId={ this.props.match.params }
              supportFiles={ supportFiles }
              hasSubmittedData={ hasSubmittedData }
              protectImages={ protectImages }
              handleChange={ this.handleChange }
              config={ supportFilesConfig }
              hasUploaded={
                this.getSupportFilesCount() === uploadedSupportFilesCount
              }
            />
          </div>

          <div className="edit-project__items">
            <ProjectItemsList
              listEl="ul"
              data={ videos }
              projectId={ this.props.match.params }
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
                { /**
                   * @todo Does this need a label?
                   * Is hiding the file input best
                   * practice for accessibility?
                   */ }
                <input
                  ref={ this.handleAddMoreRef }
                  type="file"
                  accept=".mov, .mp4, .mpg, .wmv, .avi"
                  multiple
                  style={ { display: 'none' } }
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
  project: object,
  loadVideoProjects: func,
  saveProjectData: func,
  deleteVideoProject: func,
  uploadedVideosCount: number,
  uploadedSupportFilesCount: number
};

VideoEditProject.defaultProps = {
  uploadedVideosCount: 0,
  uploadedSupportFilesCount: 0
};

const mapStateToProps = () => createStructuredSelector( {
  project: makeSelectCurrentVideoEditProject(),
  uploadedVideosCount: makeUploadedVideoProjectItemsCount(),
  uploadedSupportFilesCount: makeUploadedSupportFilesCount()
} );

export default connect( mapStateToProps, actions )( VideoEditProject );
