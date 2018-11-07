/**
 *
 * VideoEditProject
 *
 */
import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoEditProject from './selectors';

import Page from 'components/Page';
import ProjectHeader from 'components/Project/ProjectHeader';
import Breadcrumbs from 'components/Breadcrumbs';
import VideoConfirmDelete from 'components/Project/ReviewProject/Video/VideoConfirmDelete';
import PreviewProjectContent from 'components/Project/PreviewProjectContent/Loadable';
import SupportFileTypeList from 'components/Project/EditProject/SupportFileTypeList';
import IconPopup from 'components/Project/EditProject/IconPopup';
import PreviewProject from 'components/Project/PreviewProject';
import Notification from 'components/Project/Notification/Loadable';
import ProjectItemsList from 'components/Project/ProjectItemsList';
import VideoItem from 'components/Project/Types/VideoItem';

import EditSingleProjectItem from 'containers/Project/EditSingleProjectItem';

import {
  Button,
  Checkbox,
  Confirm,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Progress,
  Select,
  TextArea
} from 'semantic-ui-react';

import './VideoEditProject.css';
import { categoryData, privacyOptions } from './mockData';


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

    const saveNotificationMsg = isUploadInProgress ? 'Saving project...' : 'Project saved as draft';

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
            { !hasSubmittedData &&
              <p style={ { padding: '1em 1.75em' } }>
                <strong>Fill out the required fields to finish setting up this project.</strong> Your files will not be uploaded until the project is saved as a draft.
              </p> }

            { displayTheSaveMsg &&
              <Notification
                customStyles={ {
                  position: 'absolute',
                  top: '11em',
                  left: '50%',
                  transform: 'translateX(-50%)'
                  } }
                msg={ saveNotificationMsg }
              /> }

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

            { displayTheUploadSuccessMsg &&
              <p style={ { padding: '1em 1.75em' } }>
                <Icon size="large" name="check circle outline" /> Files uploaded successfully!
              </p> }
          </div>

          <div className="edit-project__content" style={ contentStyle }>
            <Form className="edit-project__form project-data" onSubmit={ this.handleSubmit }>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width="16">
                    <h2 className="heading">
                      <span className="uppercase">Project Data</span>{ ' ' }
                      <small className="msg--required">Required Fields *</small>
                    </h2>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column mobile={ 16 } computer={ 8 }>
                    <Form.Group widths="equal">
                      <Form.Field
                        id="video-title"
                        control={ Input }
                        label="Video Title"
                        required
                        autoFocus="true"
                        name="title"
                        value={ title || '' }
                        onChange={ this.handleChange }
                      />

                      <Form.Field
                        id="privacy-setting"
                        control={ Select }
                        label="Privacy Setting"
                        options={ privacyOptions }
                        required
                        name="privacy"
                        value={ privacySetting }
                        onChange={ this.handleChange }
                      />
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field
                        id="author"
                        control={ Input }
                        label="Author"
                        placeholder="Jane Doe"
                        name="author"
                        value={ author || '' }
                        onChange={ this.handleChange }
                      />

                      <Form.Field
                        id="owner"
                        control={ Input }
                        label="Owner"
                        placeholder="IIP Video Production"
                        name="owner"
                        value={ owner || '' }
                        onChange={ this.handleChange }
                      />
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Dropdown
                        id="video-categories"
                        control={ Dropdown }
                        label={ `Categories - select up to ${this.MAX_CATEGORY_COUNT}` }
                        required
                        placeholder="-"
                        options={ categoryData }
                        fluid
                        multiple
                        search
                        selection
                        closeOnBlur
                        closeOnChange
                        name="categories"
                        value={ categories }
                        onChange={ this.handleChange }
                        error={ hasExceededMaxCategories }
                      />

                      <div className="field">
                        <Form.Field
                          id="video-tags"
                          control={ Input }
                          label="Tags"
                          name="tags"
                          value={ tags || '' }
                          onChange={ this.handleChange }
                          style={ { marginBottom: '1em' } }
                        />
                        <p>Enter keywords separated by commas.</p>
                      </div>
                    </Form.Group>
                  </Grid.Column>

                  <Grid.Column mobile={ 16 } computer={ 8 }>
                    <Form.Field
                      id="public-description"
                      control={ TextArea }
                      label="Public Description"
                      name="publicDesc"
                      value={ publicDesc }
                      onChange={ this.handleChange }
                    />

                    <div className="field">
                      <Form.Field
                        id="internal-description"
                        control={ TextArea }
                        label="Internal Description"
                        name="internalDesc"
                        value={ internalDesc }
                        onChange={ this.handleChange }
                      />
                      <p>Reason for this project as it relates to Department objectives.</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>

                { !hasSubmittedData &&
                  <Grid.Row>
                    <Grid.Column width="16">
                      <Button
                        className="edit-project__form--save"
                        content="Save draft & upload files to this project"
                        disabled={ !hasRequiredData }
                      />
                    </Grid.Column>
                  </Grid.Row> }
              </Grid>
            </Form>
          </div>

          <div className="edit-project__support-files">
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={ 16 }>
                  <h2 className="heading uppercase">Support Files</h2>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={ 3 } divided>
                <Grid.Column>
                  <SupportFileTypeList
                    headline="SRT Files"
                    fileType="srt"
                    popupMsg="Some info about what SRT files are."
                    data={ supportFiles.srt }
                    hasSubmittedData={ hasSubmittedData }
                  />
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headline="Thumbnail Files"
                    fileType="thumbnail"
                    popupMsg="Thumbnail to be used when a video is unable to be played or when audio only audio is used."
                    data={ supportFiles.thumbnail }
                    hasSubmittedData={ hasSubmittedData }
                  />

                  <Fragment>
                    <Checkbox
                      label="Disable right-click to protect your images"
                      name="protectImages"
                      type="checkbox"
                      checked={ protectImages }
                      onChange={ this.handleChange }
                    />
                    <IconPopup
                      message="Checking this prevents people from downloading and using your images. Useful if your images are licensed."
                      size="small"
                      iconType="info circle"
                    />
                  </Fragment>
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headline="Additional Files"
                    fileType="other"
                    popupMsg="Additional files that can be used with this video, e.g., audio file, pdf."
                    data={ supportFiles.other }
                    hasSubmittedData={ hasSubmittedData }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="edit-project__items">
            <ProjectItemsList
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
