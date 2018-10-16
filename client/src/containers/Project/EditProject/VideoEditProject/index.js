/**
 *
 * VideoEditProject
 *
 */
import React, { Fragment } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoEditProject from './selectors';

import Page from 'components/Page';
import ProjectHeader from 'components/Project/ProjectHeader';
import VideoConfirmDelete from 'components/Project/ReviewProject/Video/VideoConfirmDelete';
import Breadcrumbs from 'components/Breadcrumbs';
import {
  Button,
  Checkbox,
  Confirm,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Modal,
  Popup,
  Progress,
  Select,
  TextArea
} from 'semantic-ui-react';

import './VideoEditProject.css';
import {
  categoryData,
  privacyOptions,
  supportFiles,
  additionalVideos
} from './mockData';


/**
 * These components can probably probably
 * be placed in their own separate files
 */

const withModal = ( props, Trigger, Content ) => (
  <Modal trigger={ <Trigger { ...props } /> }>
    <Modal.Content>
      <Content { ...props } />
    </Modal.Content>
  </Modal>
);

const IconPopup = ( props ) => {
  const { message, size, iconType } = props;
  return (
    <Popup
      trigger={ <Icon size={ size } name={ iconType } /> }
      content={ message }
      size={ size }
      inverted
    />
  );
};
IconPopup.propTypes = {
  message: string.isRequired,
  size: string,
  iconType: string.isRequired
};

const EditSingleProjectItem = ( props ) => {
  const { title } = props;
  return (
    <article className="edit-project-item">
      <header className="header">
        <h2>{ title }</h2>
      </header>
      <p>Edit Single Project Item Component</p>
    </article>
  );
};
EditSingleProjectItem.propTypes = {
  title: string
};

const VideoItem = ( props ) => {
  const {
    title,
    lang,
    ltr,
    thumbnail,
    ...rest
  } = props;

  const itemStyle = {
    flexBasis: '25%',
    marginRight: '1rem',
    cursor: 'pointer'
  };

  return (
    <li className="video" style={ itemStyle } { ...rest }>
      <img
        src={ thumbnail.url }
        alt={ thumbnail.alt }
        className="thumbnail"
      />
      <h3
        className={ ltr ? 'ltr' : 'rtl' }
        style={ { marginTop: '0' } }
      >
        { title }
      </h3>
      <p style={ { textTransform: 'capitalize' } }>{ lang }</p>
    </li>
  );
};
VideoItem.propTypes = {
  title: string,
  lang: string,
  ltr: bool,
  thumbnail: object
};

const ProjectItem = ( props ) => {
  const {
    isAvailable,
    displayItemInModal,
    modalTrigger,
    modalContent,
    customPlaceholderStyle,
    ...rest
  } = props;

  const Item = modalTrigger;

  if ( !isAvailable ) {
    const defaultPlaceholderStyle = {
      flexBasis: '25%',
      marginRight: '1rem',
      cursor: 'not-allowed',
      filter: 'blur(4px)'
    };
    const style = {
      ...defaultPlaceholderStyle,
      ...customPlaceholderStyle
    };

    return <Item { ...rest } style={ style } />;
  }

  return (
    ( displayItemInModal &&
      withModal( { ...rest }, modalTrigger, modalContent ) ) ||
      <Item { ...rest } />
  );
};
ProjectItem.propTypes = {
  isAvailable: bool,
  displayItemInModal: bool,
  modalTrigger: func,
  modalContent: func,
  customPlaceholderStyle: object
};

const ProjectItemsList = ( props ) => {
  const {
    data,
    headline,
    hasSubmittedData,
    projectType,
    displayItemInModal,
    modalTrigger,
    modalContent,
    customListStyle,
    customPlaceholderStyle
  } = props;

  const defaultListStyle = {
    display: 'flex',
    paddingLeft: '0',
    listStyle: 'none'
  };

  const listStyle = { ...defaultListStyle, ...customListStyle };

  return (
    <Fragment>
      <h2 style={ { textTransform: 'uppercase' } }>{ headline }</h2>
      <ul className="project-items" style={ listStyle }>
        { data.map( item => (
          <ProjectItem
            key={ item.title }
            { ...item }
            isAvailable={ hasSubmittedData }
            type={ projectType }
            displayItemInModal={ displayItemInModal }
            modalTrigger={ modalTrigger }
            modalContent={ modalContent }
            customPlaceholderStyle={ customPlaceholderStyle }
          />
        ) ) }
      </ul>
    </Fragment>
  );
};
ProjectItemsList.propTypes = {
  data: array.isRequired,
  headline: string,
  hasSubmittedData: bool,
  projectType: string.isRequired,
  displayItemInModal: bool,
  modalTrigger: func,
  modalContent: func,
  customListStyle: object,
  customPlaceholderStyle: object
};

const EditSupportFilesButton = ( props ) => {
  const { className, btnContent } = props;

  /**
   * Duplicate props to avoid unknown prop warning
   * @see https://reactjs.org/warnings/unknown-prop.html
   */
  const btnProps = { ...props };
  delete btnProps.fileType;
  delete btnProps.btnContent;
  delete btnProps.className;

  return (
    <Button
      className={ className }
      type="button"
      content={ btnContent }
      size="small"
      basic
      compact
      { ...btnProps }
    />
  );
};
EditSupportFilesButton.propTypes = {
  className: string,
  btnContent: string.isRequired
};

const EditSupportFilesContent = ( props ) => {
  const { fileType } = props;

  /**
   * Duplicate props to avoid unknown prop warning
   * @see https://reactjs.org/warnings/unknown-prop.html
   */
  const articleProps = { ...props };
  delete articleProps.btnContent;
  delete articleProps.fileType;

  const headingStyle = {
    textTransform: ( fileType === 'srt' && 'uppercase' ) || 'capitalize'
  };

  return (
    <article className={ `${fileType}-files` } { ...articleProps }>
      <header className="header">
        <h2>Edit <span style={ headingStyle }>{ fileType }</span> files in this project</h2>
      </header>
      <p>Curabitur blandit tempus porttitor.</p>
    </article>
  );
};
EditSupportFilesContent.propTypes = {
  fileType: string
};

const EditSupportFilesModal = props =>
  withModal( props, EditSupportFilesButton, EditSupportFilesContent );
EditSupportFilesModal.propTypes = {
  className: string,
  fileType: string,
  btnContent: string
};

const SupportItem = ( props ) => {
  const { lang, fileType, isAvailable } = props;
  const content = supportFiles[lang][fileType];
  const placeholderStyle = {
    filter: 'blur(4px)'
  };

  if ( content ) {
    return (
      <li className="support-item" style={ !isAvailable ? placeholderStyle : null }>
        { content }
        <span className="item-lang" style={ { fontWeight: 'bold', textTransform: 'capitalize' } }>
          { lang }
        </span>
      </li>
    );
  }
  return null;
};
SupportItem.propTypes = {
  lang: string,
  fileType: string,
  isAvailable: bool
};

const SupportFileTypeList = ( props ) => {
  const {
    headline,
    fileType,
    popupMsg,
    data,
    hasSubmittedData
  } = props;

  return (
    <Fragment>
      <h3>{ `${headline} ` }
        { hasSubmittedData &&
          <Fragment>
            <IconPopup
              message={ popupMsg }
              size="small"
              iconType="info circle"
            />
            <EditSupportFilesModal
              btnContent="Edit"
              className="btn--edit"
              fileType={ fileType }
            />
          </Fragment> }
      </h3>
      <ul>
        { data.map( n => (
          <SupportItem
            key={ n }
            lang={ n }
            fileType={ fileType }
            isAvailable={ hasSubmittedData }
          />
        ) ) }
      </ul>
    </Fragment>
  );
};
SupportFileTypeList.propTypes = {
  headline: string,
  fileType: string,
  popupMsg: string,
  data: array.isRequired,
  hasSubmittedData: bool
};

const SaveNotification = ( props ) => {
  const { msg, customStyles } = props;
  const defaultStyle = {
    padding: '1em 1.5em',
    fontSize: '0.625em',
    backgroundColor: '#b9de52'
  };

  const style = { ...defaultStyle, ...customStyles };

  return <p style={ style }>{ msg }</p>;
};
SaveNotification.propTypes = {
  msg: string.isRequired,
  customStyles: object
};


/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  // use constructor instead?
  state = {
    deleteConfirmOpen: false,
    disableRightClick: true,
    hasRequiredData: false,
    hasSubmittedData: false,
    isUploadInProgress: false,
    isUploadFinished: false,
    displayTheSaveMsg: false,
    displayTheUploadSuccessMsg: false,

    /**
     * Use redux for these?
     */
    title: '',
    privacy: 'anyone',
    author: '',
    owner: '',
    categories: [],
    tags: [],
    publicDesc: '',
    internalDesc: ''
  }

  displayConfirmDelete = () => {
    this.setState( { deleteConfirmOpen: true } );
  }

  handleDeleteConfirm = () => {
    this.setState( { deleteConfirmOpen: false } );
  }

  handleDeleteCancel = () => {
    this.setState( { deleteConfirmOpen: false } );
  }

  handlePreview = () => {
    console.log( 'Preview Project' );
  }

  handleFinalReview = () => {
    console.log( 'Project Final Review' );
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
    // need to debounce
    // avoid setState twice?
    this.setState( {
      [name]: value || checked
    } );
    this.setState( nextState => ( {
      hasRequiredData: nextState.title && nextState.privacy && nextState.categories.length > 0
    } ) );
  };

  handleSubmit = () => {
    const { disableRightClick, tags } = this.state;

    this.setState( {
      disableRightClick,
      hasSubmittedData: true,
      isUploadInProgress: true,
      displayTheSaveMsg: true,
      tags: tags.length > 0 ? tags.split( /\s?[,;]\s?/ ) : tags
    } );

    // use setTimeout to simulate upload time
    setTimeout( this.handleUpload, 5000 );
    window.scroll( { top: 0, behavior: 'smooth' } );
  }

  render() {
    const langs = Object.keys( supportFiles );
    const {
      disableRightClick,
      hasRequiredData,
      hasSubmittedData,
      isUploadInProgress,
      isUploadFinished,
      displayTheSaveMsg,
      displayTheUploadSuccessMsg,
      title,
      privacy,
      author,
      owner,
      categories,
      tags,
      publicDesc,
      internalDesc
    } = this.state;

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
              <Button
                className="edit-project__btn--preview"
                content="Preview Project"
                basic
                onClick={ this.handlePreview }
                disabled={ !isUploadFinished }
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
              <SaveNotification
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
                        value={ privacy }
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
                        label="Categories - select up to 2"
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
                    data={ langs }
                    hasSubmittedData={ hasSubmittedData }
                  />
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headline="Thumbnail Files"
                    fileType="thumbnail"
                    popupMsg="Thumbnail to be used when a video is unable to be played or when audio only audio is used."
                    data={ langs }
                    hasSubmittedData={ hasSubmittedData }
                  />

                  <Fragment>
                    <Checkbox
                      label="Disable right-click to protect your images"
                      name="disableRightClick"
                      type="checkbox"
                      checked={ disableRightClick }
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
                    data={ langs }
                    hasSubmittedData={ hasSubmittedData }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="edit-project__items">
            <ProjectItemsList
              data={ additionalVideos }
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
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoeditproject: makeSelectVideoEditProject()
} );

export default connect( mapStateToProps, actions )( VideoEditProject );
