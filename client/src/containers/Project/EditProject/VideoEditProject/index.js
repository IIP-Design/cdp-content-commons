/**
 *
 * VideoEditProject
 *
 */
import React, { Fragment } from 'react';
import { array, bool, object, string } from 'prop-types';
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
  List,
  Modal,
  Popup,
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

const IconPopup = ( { message, size, iconType } ) => (
  <Popup
    trigger={ <Icon size={ size } name={ iconType } /> }
    content={ message }
    size={ size }
    inverted
  />
);
IconPopup.propTypes = {
  message: string,
  size: string,
  iconType: string
};

const ItemPlaceholder = () => {
  const placeholderLayout = {
    display: 'flex',
    justifyContent: 'space-between',
    filter: 'blur(2px)'
  };

  const style1 = {
    flexBasis: '75%',
    marginBottom: '0.625em',
    height: '1em',
    backgroundColor: '#d6d7d9'
  };

  const style2 = {
    flexBasis: '20%',
    backgroundColor: '#b2b4b8'
  };

  return (
    <div style={ placeholderLayout }>
      <div style={ style1 } />
      <div style={ { ...style1, ...style2 } } />
    </div>
  );
};

const VideoPlaceholder = ( { layout } ) => {
  const placeholderStyle = {
    cursor: 'not-allowed',
    filter: 'blur(2px)'
  };

  const style1 = {
    height: '162px',
    marginBottom: '0.625em',
    backgroundColor: '#d6d7d9'
  };

  const style2 = {
    height: '1em',
    width: '85%'
  };

  const style3 = {
    height: '0.625em',
    width: '35%'
  };

  return (
    <div style={ { ...layout, ...placeholderStyle } }>
      <div style={ style1 } />
      <div style={ { ...style1, ...style2 } } />
      <div style={ { ...style1, ...style3 } } />
    </div>
  );
};
VideoPlaceholder.propTypes = {
  layout: object
};

const AdditionalVideo = ( {
  title,
  lang,
  ltr,
  thumbnail,
  isVisible
} ) => {
  const langStyle = { textTransform: 'capitalize' };
  const layoutStyle = {
    flexBasis: '25%',
    marginRight: '1rem',
    cursor: 'pointer'
  };

  if ( !isVisible ) {
    return <VideoPlaceholder layout={ layoutStyle } />;
  }

  return (
    <Modal trigger={
      <article className="video" style={ layoutStyle }>
        <img
          src={ thumbnail.url }
          alt={ thumbnail.alt }
          className="thumbnail"
        />
        <header>
          <h3 className={ ltr ? 'ltr' : 'rtl' }>{ title }</h3>
        </header>
        <p style={ langStyle }>{ lang }</p>
      </article> }
    >
      <Modal.Header>Edit { title } - { lang }</Modal.Header>
      <Modal.Content>Maecenas faucibus mollis interdum.</Modal.Content>
    </Modal>
  );
};
AdditionalVideo.propTypes = {
  title: string,
  lang: string,
  ltr: bool,
  thumbnail: object,
  isVisible: bool
};

const AdditionalVideos = ( { data, headingTxt, hasSaved } ) => {
  const headingStyle = { textTransform: 'uppercase' };
  const layoutStyle = { display: 'flex' };
  return (
    <Fragment>
      <h2 style={ headingStyle }>{ headingTxt }</h2>
      <div className="additional-videos" style={ layoutStyle }>
        { data.map( video => <AdditionalVideo key={ video.title } { ...video } isVisible={ hasSaved } /> ) }
      </div>
    </Fragment>
  );
};
AdditionalVideos.propTypes = {
  data: array,
  headingTxt: string,
  hasSaved: bool
};

const EditSupportFilesModal = ( { btnContent, className, fileType } ) => {
  const headingStyle = {
    textTransform: ( fileType === 'srt' && 'uppercase' ) || 'capitalize'
  };

  return (
    <Modal trigger={
      <Button
        className={ className }
        type="button"
        content={ btnContent }
        size="small"
        basic
        compact
      /> }
    >
      <Modal.Header>Edit <span style={ headingStyle }>{ fileType }</span> files in this project</Modal.Header>
      <Modal.Content>Curabitur blandit tempus porttitor.</Modal.Content>
    </Modal>
  );
};
EditSupportFilesModal.propTypes = {
  btnContent: string,
  className: string,
  fileType: string
};

const SupportItem = ( { lang, fileType, isVisible } ) => {
  if ( !isVisible ) {
    return <ItemPlaceholder />;
  }

  const content = supportFiles[lang][fileType];

  if ( content ) {
    return (
      <List.Item style={ { fontSize: '0.875em' } }>
        <List.Content floated="right">
          <b style={ { textTransform: 'capitalize' } }>{ lang }</b>
        </List.Content>
        <List.Content>{ content }</List.Content>
      </List.Item>
    );
  }
  return null;
};
SupportItem.propTypes = {
  lang: string,
  fileType: string,
  isVisible: bool
};

const SupportFileTypeList = ( {
  headingTxt,
  fileType,
  popupMsg,
  data,
  hasSaved
} ) => (
  <Fragment>
    <h3>{ `${headingTxt} ` }
      { hasSaved &&
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
    <List>
      { data.map( n => (
        <SupportItem
          key={ n }
          lang={ n }
          fileType={ fileType }
          isVisible={ hasSaved }
        />
      ) ) }
    </List>
  </Fragment>
);
SupportFileTypeList.propTypes = {
  headingTxt: string,
  fileType: string,
  popupMsg: string,
  data: array,
  hasSaved: bool
};


/* eslint-disable react/prefer-stateless-function */
class VideoEditProject extends React.PureComponent {
  // use constructor instead?
  state = {
    deleteConfirmOpen: false,
    disableRightClick: true,
    hasRequiredData: false,
    hasSavedDraft: false,
    isUploadInProgress: false,
    isUploadFinished: false,

    /**
     * Use redux for these?
     */
    title: '',
    privacy: '',
    author: '',
    owner: '',
    categories: [],
    tags: '',
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
      isUploadInProgress: false
    } );
  }

  handleChange = ( e, { name, value } ) => {
    // need to debounce
    // avoid setState twice?
    this.setState( {
      [name]: value
    } );
    this.setState( nextState => ( {
      hasRequiredData: nextState.title && nextState.privacy && nextState.categories.length > 0
    } ) );
  };

  handleSubmit = () => {
    const { disableRightClick } = this.state;

    this.setState( {
      disableRightClick,
      hasSavedDraft: true,
      isUploadInProgress: true
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
      hasSavedDraft,
      isUploadInProgress,
      isUploadFinished,
      title,
      privacy,
      author,
      owner,
      categories,
      tags,
      publicDesc,
      internalDesc
    } = this.state;

    const pageTitle = `Project Details${hasSavedDraft ? ' - Edit' : ''}`;

    const contentStyle = {
      border: `${( hasRequiredData && hasSavedDraft ) ? 'none' : '3px solid #02bfe7'}`
    };

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

          <div className="edit-project__status" style={ isUploadFinished ? { padding: '0' } : null }>
            { !hasSavedDraft &&
              <p><strong>Fill out the required fields to finish setting up this project.</strong> Your files will not be uploaded until the project is saved as a draft.</p> }

            { isUploadInProgress &&
              <Fragment>
                <p style={ { marginBottom: '0' } }><strong>Uploading files:</strong> 8 of 11</p>
                <p>Please keep this page open until upload is complete</p>
              </Fragment> }
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
                        value={ title }
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
                        value={ author }
                        onChange={ this.handleChange }
                      />

                      <Form.Field
                        id="owner"
                        control={ Input }
                        label="Owner"
                        placeholder="IIP Video Production"
                        name="owner"
                        value={ owner }
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
                          value={ tags }
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

                { !hasSavedDraft &&
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
                    headingTxt="SRT Files"
                    fileType="srt"
                    popupMsg="Some info about what SRT files are."
                    data={ langs }
                    hasSaved={ hasSavedDraft }
                  />
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headingTxt="Thumbnail Files"
                    fileType="thumbnail"
                    popupMsg="Thumbnail to be used when a video is unable to be played or when audio only audio is used."
                    data={ langs }
                    hasSaved={ hasSavedDraft }
                  />

                  { hasSavedDraft &&
                    <Fragment>
                      <Checkbox
                        label="Disable right-click to protect your images"
                        name="disableRightClick"
                        checked={ disableRightClick }
                        onChange={ this.handleChange }
                      />
                      <IconPopup
                        message="Checking this prevents people from downloading and using your images. Useful if your images are licensed."
                        size="small"
                        iconType="info circle"
                      />
                    </Fragment> }
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headingTxt="Additional Files"
                    fileType="other"
                    popupMsg="Additional files that can be used with this video, e.g., audio file, pdf."
                    data={ langs }
                    hasSaved={ hasSavedDraft }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="edit-project__additional-videos">
            <AdditionalVideos
              data={ additionalVideos }
              headingTxt="Videos in Project"
              hasSaved={ hasSavedDraft }
            />

            { hasSavedDraft &&
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
