/**
 *
 * EditProject
 *
 */
import React, { Fragment } from 'react';
import { array, bool, object, string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditProject from './selectors';

import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import {
  Button,
  Checkbox,
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

import './EditProject.css';
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

const AdditionalVideo = ( {
  title,
  lang,
  ltr,
  thumbnail
} ) => {
  const langStyle = { textTransform: 'capitalize' };
  const videoStyle = {
    flexBasis: '25%',
    marginRight: '1rem',
    cursor: 'pointer'
  };

  return (
    <Modal trigger={
      <article className="video" style={ videoStyle }>
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
  thumbnail: object
};

const AdditionalVideos = ( { data, headingTxt } ) => {
  const headingStyle = { textTransform: 'uppercase' };
  const layoutStyle = { display: 'flex' };
  return (
    <Fragment>
      <h2 style={ headingStyle }>{ headingTxt }</h2>
      <div className="additional-videos" style={ layoutStyle }>
        { data.map( video => <AdditionalVideo key={ video.title } { ...video } /> ) }
      </div>
    </Fragment>
  );
};
AdditionalVideos.propTypes = {
  data: array,
  headingTxt: string
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

const SupportItem = ( { lang, fileType } ) => {
  const content = supportFiles[lang][fileType];
  if ( content ) {
    return (
      <List.Item>
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
  fileType: string
};

const SupportFileTypeList = ( {
  headingTxt,
  fileType,
  popupMsg,
  data
} ) => (
  <Fragment>
    <h3>{ `${headingTxt} ` }
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
    </h3>
    <List>
      { data.map( n => (
        <SupportItem
          key={ n }
          lang={ n }
          fileType={ fileType }
        />
      ) ) }
    </List>
  </Fragment>
);
SupportFileTypeList.propTypes = {
  headingTxt: string,
  fileType: string,
  popupMsg: string,
  data: array
};


/* eslint-disable react/prefer-stateless-function */
class EditProject extends React.PureComponent {
  handleDelete = () => {
    console.log( 'Delete Project' );
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

  handleSubmit = () => {
    console.log( 'Form Submitted' );
  }

  render() {
    const langs = Object.keys( supportFiles );
    return (
      <Page title="Edit Project" description="Edit content project">
          <Breadcrumbs />
          <header className="edit-project__page-header">
            <h1 className="edit-project__page-heading">
              <Icon
                size="tiny"
                name="video camera"
                circular
                inverted
              />
              Project Details
            </h1>

            <div className="edit-project__btn-group">
              <Button
                className="edit-project__btn--delete"
                content="Delete Project"
                basic
                onClick={ this.handleDelete }
              />
              <Button
                className="edit-project__btn--preview"
                content="Preview Project"
                color="blue"
                basic
                onClick={ this.handlePreview }
              />
              <Button
                className="edit-project__btn--final-review"
                content="Final Review"
                color="blue"
                onClick={ this.handleFinalReview }
              />
            </div>
          </header>

          <div className="edit-project__status">
            <p><strong>Fill out the required fields to finish setting up this project.</strong> Your files will not be uploaded until the project is saved as a draft.</p>
          </div>

          <div className="edit-project__content">
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
                  />

                  <Form.Dropdown
                    id="video-categories"
                    control={ Dropdown }
                    label="Categories - select up to 2"
                    required
                    placeholder="-"
                    options={ categories }
                    fluid
                    multiple
                    search
                    selection
                    closeOnBlur
                    closeOnChange
                  />

                  <Form.Field
                    id="video-tags"
                    control={ Input }
                    label="Tags"
                  />
                  <p>Enter keywords separated by commas. No limits on tags.</p>

                  <Form.Field
                    id="privacy-setting"
                    control={ Select }
                    label="Privacy Setting"
                    options={ privacyOptions }
                    required
                  />
                    </Form.Group>

                    <Form.Group widths="equal">
                    <Form.Field
                      id="author"
                      control={ Input }
                      label="Author"
                      placeholder="Jane Doe"
                    />

                    <Form.Field
                      id="owner"
                      control={ Input }
                      label="Owner"
                      placeholder="IIP Video Production"
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
                      />

                      <div className="field">
                        <Form.Field
                          id="video-tags"
                          control={ Input }
                          label="Tags"
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
                  />

                    <div className="field">
                  <Form.Field
                    id="internal-description"
                    control={ TextArea }
                    label="Internal Description"
                  />
                  <p>Reason for this project as it relates to Department objectives.</p>
                </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width="16">
                    <Button
                      className="edit-project__form--save"
                      content="Save draft & upload files to this project"
                    />
                  </Grid.Column>
                </Grid.Row>
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
                />
                </Grid.Column>

                <Grid.Column>
                <SupportFileTypeList
                  headingTxt="Thumbnail Files"
                  fileType="thumbnail"
                  popupMsg="Thumbnail to be used when a video is unable to be played or when audio only audio is used."
                  data={ langs }
                />

                <Checkbox label="Disable right-click to protect your images" />
                <IconPopup
                  message="Checking this prevents people from downloading and using your images. Useful if your images are licensed."
                  size="small"
                  iconType="info circle"
                />
                </Grid.Column>

                <Grid.Column>
                  <SupportFileTypeList
                    headingTxt="Additional Files"
                    fileType="other"
                    popupMsg="Additional files that can be used with this video, e.g., audio file, pdf."
                    data={ langs }
              />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div className="edit-project__additional-videos">
            <AdditionalVideos data={ additionalVideos } headingTxt="Videos in Project" />

            <div style={ { marginTop: '3rem' } }>
              <Button
                className="edit-project__add-more"
                content="+ Add more files to this project"
                color="blue"
                basic
                onClick={ this.handleAddMoreFiles }
              />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

EditProject.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  EditProject: makeSelectEditProject()
} );

export default connect( mapStateToProps, actions )( EditProject );
