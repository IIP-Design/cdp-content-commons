/**
 *
 * EditSupportFileRow
 *
 */
import React from 'react';
import { array, func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFileRow from './selectors';
import { Button, Dropdown, Grid } from 'semantic-ui-react';

import VisuallyHidden from 'components/VisuallyHidden';
import { languages } from '../mockData';

import './EditSupportFileRow.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFileRow extends React.PureComponent {
  handleReplaceFile = () => {
    console.log( 'replace file' );
    this.addReplaceFileRef.click();
  }

  handleDeleteFile = () => {
    console.log( 'delete file' );
  }

  handleReplaceFileRef = ( input ) => {
    this.addReplaceFileRef = input;
  }

  renderIcons = () => {
    const { fileExtensions, fileType } = this.props;
    const isSingleType = fileExtensions.length === 1;
    const isOther = fileType === 'other';
    const acceptedTypes = isSingleType && !isOther ? fileExtensions[0] : '';

    return (
      <Button.Group basic size="massive">
        <Button
          className="replace"
          icon="refresh"
          onClick={ this.handleReplaceFile }
          basic
        />
        <VisuallyHidden>
          { /* eslint-disable jsx-a11y/label-has-for */ }
          <label htmlFor="upload-file--single">upload file</label>
          <input
            id="upload-file--single"
            ref={ this.handleReplaceFileRef }
            type="file"
            accept={ acceptedTypes }
          />
        </VisuallyHidden>
        <Button
          className="delete"
          icon="delete"
          onClick={ this.handleDeleteFile }
          basic
        />
      </Button.Group>
    );
  }

  render() {
    const { file, handleChange, selectedLanguage } = this.props;
    const { file: fileName, id } = file;

    return (
      <Grid.Row>
        <Grid.Column mobile={ 7 }>{ fileName }</Grid.Column>
        <Grid.Column mobile={ 5 }>
          { /* eslint-disable jsx-a11y/label-has-for */
            <VisuallyHidden>
              <label htmlFor={ `file-${id}` }>
                { `${fileName} language` }
              </label>
            </VisuallyHidden> }
          <Dropdown
            id={ id }
            onChange={ handleChange }
            options={ languages }
            placeholder="Select language"
            text={ selectedLanguage }
            value={ selectedLanguage }
            error={ !selectedLanguage }
            fluid
            required
            selection
          />
        </Grid.Column>
        <Grid.Column mobile={ 4 }>{ this.renderIcons() }</Grid.Column>
      </Grid.Row>
    );
  }
}

EditSupportFileRow.propTypes = {
  handleChange: func,
  file: object,
  fileExtensions: array,
  fileType: string,
  selectedLanguage: string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilerow: makeSelectEditSupportFileRow()
} );

export default connect( mapStateToProps, actions )( EditSupportFileRow );
