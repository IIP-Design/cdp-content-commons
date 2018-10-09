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
  List,
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

const SupportItemPlaceholder = () => {
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

const VideoItemPlaceholder = () => {
  const placeholderStyle = {
    flexBasis: '25%',
    marginRight: '1rem',
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
    <li className="placeholder" style={ placeholderStyle }>
      <div style={ style1 } />
      <div style={ { ...style1, ...style2 } } />
      <div style={ { ...style1, ...style3 } } />
    </li>
  );
};

const Placeholder = ( { type } ) => (
  ( type === 'video' && <VideoItemPlaceholder /> ) || <SupportItemPlaceholder />
);

const VideoItem = ( {
  title,
  lang,
  ltr,
  thumbnail,
  ...rest
} ) => {
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
    type,
    displayInModal,
    modalTrigger,
    modalContent,
    ...rest
  } = props;

  const Item = modalTrigger;

  if ( !isAvailable ) return <Placeholder type={ type } />;

  return (
    ( displayInModal &&
      withModal( { ...rest }, modalTrigger, modalContent ) ) ||
      <Item { ...rest } />
  );
};
ProjectItem.propTypes = {
  isAvailable: bool,
  type: string,
  displayInModal: bool,
  modalTrigger: func,
  modalContent: func
};

const ProjectItemsList = ( {
  data,
  headingTxt,
  hasSubmitted,
  projectType,
  modalTrigger,
  modalContent
} ) => {
  const listStyle = {
    display: 'flex',
    paddingLeft: '0',
    listStyle: 'none'
  };
  return (
    <Fragment>
      <h2 style={ { textTransform: 'uppercase' } }>{ headingTxt }</h2>
      <ul className="project-items" style={ listStyle }>
        { data.map( item => (
          <ProjectItem
            key={ item.title }
            { ...item }
            isAvailable={ hasSubmitted }
            type={ projectType }
            displayInModal
            modalTrigger={ modalTrigger }
            modalContent={ modalContent }
          />
        ) ) }
      </ul>
    </Fragment>
  );
};
ProjectItemsList.propTypes = {
  data: array,
  headingTxt: string,
  hasSubmitted: bool,
  projectType: string,
  modalTrigger: func,
  modalContent: func
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

const SupportItem = ( { lang, fileType, isAvailable } ) => {
  if ( !isAvailable ) {
    return <SupportItemPlaceholder />;
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
  isAvailable: bool
};

const SupportFileTypeList = ( {
  headingTxt,
  fileType,
  popupMsg,
  data,
  hasSubmitted
} ) => (
  <Fragment>
    <h3>{ `${headingTxt} ` }
      { hasSubmitted &&
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
          isAvailable={ hasSubmitted }
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
  hasSubmitted: bool
};

const SaveNotification = ( { msg, customStyles = {} } ) => {
  const defaultStyle = {
    padding: '1em 1.5em',
    fontSize: '0.625em',
    backgroundColor: '#b9de52'
  };

  return <p style={ { ...defaultStyle, ...customStyles } }>{ msg }</p>;
};
SaveNotification.propTypes = {
  msg: string,
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
      hasSubmittedData: true,
      isUploadInProgress: true,
      displayTheSaveMsg: true
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
                <p style={ { marginBottom: '0' } }><span className="upload-status-label">Uploading files:</span> 8 of 11</p>
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
                    headingTxt="SRT Files"
                    fileType="srt"
                    popupMsg="Some info about what SRT files are."
                    data={ langs }
                    hasSubmitted={ hasSubmittedData }
                  />
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headingTxt="Thumbnail Files"
                    fileType="thumbnail"
                    popupMsg="Thumbnail to be used when a video is unable to be played or when audio only audio is used."
                    data={ langs }
                    hasSubmitted={ hasSubmittedData }
                  />

                  { hasSubmittedData &&
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
                    hasSubmitted={ hasSubmittedData }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="edit-project__items">
            <ProjectItemsList
              data={ additionalVideos }
              headingTxt="Videos in Project"
              hasSubmitted={ hasSubmittedData }
              projectType="video"
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
