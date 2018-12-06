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
import { Button, Confirm, Progress } from 'semantic-ui-react';

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
import VideoItem from 'containers/Project/Types/VideoItem';
import Notification from 'components/Project/Notification/Loadable';

import EditSingleProjectItem from 'containers/Project/EditSingleProjectItem';

import { ScrollToTop } from '../../../../utils/helpers';

import './VideoEditProject.css';
import {
  categoryData,
  privacyOptions,
  supportFilesConfig
} from '../../mockData';


/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  // use constructor instead?
  state = {
    deleteConfirmOpen: false,
    hasRequiredData: false,
    hasSubmittedData: false,
    isUploadInProgress: false,
    isUploadFinished: false,
    hasUnsavedData: false,
    displayTheSaveMsg: false,
    displayTheUploadSuccessMsg: false,
    hasExceededMaxCategories: false,
    totalUploaded: 8,
    totalUploadSize: 0,

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

  componentWillMount = () => {
    const videosCount = this.props.videoEditProject.videos.length;
    this.setState( {
      totalUploadSize: videosCount + this.getSupportFilesCount()
    } );
  }

  getSupportFilesCount = () => {
    const { supportFiles } = this.props.videoEditProject;
    const types = Object.keys( supportFiles );
    const count = ( acc, cur ) => acc + supportFiles[cur].length;
    return types.reduce( count, 0 );
  }

  getTags = () => {
    const { tags } = this.state.formData;
    return ( tags.length > 0 && !Array.isArray( tags ) ) ? tags.split( /\s?[,;]\s?/ ) : tags;
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

  handleSaveDraft = () => {
    console.log( 'Draft saved' );
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
        hasUnsavedData: true,
        hasExceededMaxCategories: categoryCount > this.MAX_CATEGORY_COUNT,
        hasRequiredData: ( title !== '' ) &&
          privacySetting &&
          categoryCount > 0 &&
          categoryCount <= this.MAX_CATEGORY_COUNT
      } );
    } );
  };

  handleSubmit = ( e ) => {
    e.preventDefault();
    const { protectImages } = this.state.formData;

    this.setState( prevState => ( {
      hasSubmittedData: true,
      isUploadInProgress: true,
      hasUnsavedData: false,
      displayTheSaveMsg: true,
      formData: {
        ...prevState.formData,
        tags: this.getTags(),
        protectImages
      }
    } ) );

    // use setTimeout to simulate upload time
    setTimeout( this.handleUpload, 5000 );
    ScrollToTop( { top: 0, behavior: 'smooth' } );
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
      hasUnsavedData,
      displayTheSaveMsg,
      displayTheUploadSuccessMsg,
      hasExceededMaxCategories,
      formData,
      totalUploaded,
      totalUploadSize
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

    const contentStyle = {
      border: `3px solid ${( hasRequiredData && hasSubmittedData ) ? 'transparent' : '#02bfe7'}`
    };

    const notificationMsg = isUploadInProgress ? 'Saving project...' : 'Project saved as draft';

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
              { hasSubmittedData &&
                <Button
                  className="edit-project__btn--save-draft"
                  content="Save Draft"
                  basic
                  onClick={ this.handleSaveDraft }
                  disabled={ !isUploadFinished || !hasUnsavedData }
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
            <StatusMessages
              hasSubmittedData={ hasSubmittedData }
              displayTheUploadSuccessMsg={ displayTheUploadSuccessMsg }
            />

            { displayTheSaveMsg &&
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
                value={ totalUploaded }
                total={ totalUploadSize }
                color="blue"
                size="medium"
                active
              >
                <p>
                  <b>Uploading files:</b> { totalUploaded } of { totalUploadSize }
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

              // submit button props
              hasSubmittedData={ hasSubmittedData }
              hasRequiredData={ hasRequiredData }
            />
          </div>

          <div className="edit-project__status beta">
            <StatusMessages
              hasSubmittedData={ hasSubmittedData }
              displayTheUploadSuccessMsg={ displayTheUploadSuccessMsg }
            />

            { isUploadInProgress &&
              <Progress
                value={ totalUploaded }
                total={ totalUploadSize }
                color="blue"
                size="medium"
                active
              >
                <p>
                  <b>Uploading files:</b> { totalUploaded } of { totalUploadSize }
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
