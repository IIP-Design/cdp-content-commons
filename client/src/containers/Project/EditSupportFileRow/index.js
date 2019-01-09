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
        { /**
          * @todo Is hiding the file list best
          * practice for accessibility?
          */ }
        <input
          className="upload-file"
          ref={ this.handleReplaceFileRef }
          type="file"
          accept={ acceptedTypes }
        />
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

    return (
      <Grid.Row>
        <Grid.Column mobile={ 7 }>{ file.file }</Grid.Column>
        <Grid.Column mobile={ 5 }>
          <Dropdown
            onChange={ handleChange }
            options={ languages }
            placeholder="Select Language"
            text={ selectedLanguage }
            value={ selectedLanguage }
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
