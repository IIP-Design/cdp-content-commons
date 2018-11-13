/**
 *
 * ProjectDataForm
 *
 */

import React from 'react';
import {
  array,
  bool,
  func,
  string
} from 'prop-types';
import './ProjectDataForm.css';

import {
  Button,
  Dropdown,
  Form,
  Grid,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react';

const ProjectDataForm = ( props ) => {
  const {
    handleSubmit,
    handleChange,
    videoTitle,
    privacyOptions,
    privacySetting,
    authorValue,
    ownerValue,
    categoryLabel,
    categoryOptions,
    hasExceededMaxCategories,
    categoriesValue,
    tagsValue,
    publicDescValue,
    internalDescValue,
    hasSubmittedData,
    hasRequiredData
  } = props;

  return (
    <Form className="edit-project__form project-data" onSubmit={ handleSubmit }>
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
                value={ videoTitle }
                onChange={ handleChange }
              />

              <Form.Field
                id="privacy-setting"
                control={ Select }
                label="Privacy Setting"
                options={ privacyOptions }
                required
                name="privacy"
                value={ privacySetting }
                onChange={ handleChange }
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                id="author"
                control={ Input }
                label="Author"
                placeholder="Jane Doe"
                name="author"
                value={ authorValue }
                onChange={ handleChange }
              />

              <Form.Field
                id="owner"
                control={ Input }
                label="Owner"
                placeholder="IIP Video Production"
                name="owner"
                value={ ownerValue }
                onChange={ handleChange }
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Dropdown
                id="video-categories"
                control={ Dropdown }
                label={ categoryLabel }
                required
                placeholder="-"
                options={ categoryOptions }
                fluid
                multiple
                search
                selection
                closeOnBlur
                closeOnChange
                name="categories"
                value={ categoriesValue }
                onChange={ handleChange }
                error={ hasExceededMaxCategories }
              />

              <div className="field">
                <Form.Field
                  id="video-tags"
                  control={ Input }
                  label="Tags"
                  name="tags"
                  value={ tagsValue }
                  onChange={ handleChange }
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
              value={ publicDescValue }
              onChange={ handleChange }
            />

            <div className="field">
              <Form.Field
                id="internal-description"
                control={ TextArea }
                label="Internal Description"
                name="internalDesc"
                value={ internalDescValue }
                onChange={ handleChange }
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
  );
};

ProjectDataForm.propTypes = {
  handleSubmit: func,
  handleChange: func,
  videoTitle: string,
  privacyOptions: array,
  privacySetting: string,
  authorValue: string,
  ownerValue: string,
  categoryLabel: string,
  categoryOptions: array,
  hasExceededMaxCategories: bool,
  categoriesValue: array,
  tagsValue: array,
  publicDescValue: string,
  internalDescValue: string,
  hasSubmittedData: bool,
  hasRequiredData: bool
};

export default ProjectDataForm;
