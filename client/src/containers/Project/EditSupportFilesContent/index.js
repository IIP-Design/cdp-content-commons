/**
 *
 * EditSupportFilesContent
 *
 */
import React from 'react';
import { array, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFilesContent from './selectors';
import { Button, Grid } from 'semantic-ui-react';

import ModalItem from 'components/Modals/ModalItem/ModalItem';

import EditSupportFileRow from 'containers/Project/EditSupportFileRow';

import { capitalizeFirst } from '../../../utils/helpers';

import './EditSupportFilesContent.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFilesContent extends React.PureComponent {
  state = {
    hasPopulatedLanguages: false,
    selectedLangValues: {}
  }

  getFileExtension = str => (
    str.slice( ( Math.max( 0, str.lastIndexOf( '.' ) ) || Infinity ) )
  )

  getFileExtensions = ( arr ) => {
    const allFileExtensions = arr.reduce( ( acc, curr ) => (
      acc.concat( this.getFileExtension( curr.file ) )
    ), [] );
    const uniqueExtensions = [...new Set( allFileExtensions )];
    return uniqueExtensions;
  }

  handleChange = ( e, { value } ) => (
    this.setState(
      prevState => ( {
        selectedLangValues: {
          ...prevState.selectedLangValues,
          [value]: capitalizeFirst( value )
        }
      } ),
      this.haveAllLangsBeenPopulated
    )
  )

  handleCancel = () => {
    console.log( 'cancel' );
    this.props.closeEditModal();
  }

  handleSaveFiles = () => {
    console.log( 'files saved' );
  }

  handleAddFiles = () => {
    console.log( 'add files' );
    this.addFilesInputRef.click();
  }

  handleAddFilesRef = ( input ) => {
    this.addFilesInputRef = input;
  }

  haveAllLangsBeenPopulated = () => {
    const { data: files } = this.props;
    const { selectedLangValues } = this.state;
    const fileCount = files.length;
    const populatedLangsCount = Object.keys( selectedLangValues ).length;

    if ( fileCount === populatedLangsCount ) {
      this.setState( {
        hasPopulatedLanguages: true
      } );
    }
  }

  renderRow = ( file ) => {
    const { data: files, fileType } = this.props;
    const { id, lang } = file;
    const { selectedLangValues } = this.state;
    return (
      <EditSupportFileRow
        key={ id }
        file={ file }
        fileType={ fileType }
        fileExtensions={ this.getFileExtensions( files ) }
        handleChange={ this.handleChange }
        selectedLanguage={ selectedLangValues[lang] }
      />
    );
  }

  render() {
    const { data: files, fileType } = this.props;
    const { hasPopulatedLanguages } = this.state;

    const headline = fileType === 'srt'
      ? fileType.toUpperCase()
      : capitalizeFirst( fileType );

    return (
      <ModalItem
        customClassName={ `edit-support-files ${fileType}` }
        headline={ `Edit ${headline} files in this project` }
        textDirection="ltr"
      >
        <Grid divided="vertically" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column mobile={ 7 }>
              { headline } Files Selected
            </Grid.Column>
            <Grid.Column mobile={ 5 }>
              Language
              <small className="msg--required"> *</small>
            </Grid.Column>
            <Grid.Column mobile={ 4 } />
          </Grid.Row>

          { files.map( this.renderRow ) }

          <Grid.Row>
            <Grid.Column className="btn-group">
              <Button
                className="cancel"
                content="Cancel"
                basic
                onClick={ this.handleCancel }
              />
              <Button
                className="add-files"
                content="Add Files"
                color="blue"
                basic
                onClick={ this.handleAddFiles }
              />
              { /**
                 * @todo Is hiding the file list best
                 * practice for accessibility?
                 */ }
              <input
                className="upload-file"
                ref={ this.handleAddFilesRef }
                type="file"
                multiple
              />
              <Button
                className="save"
                content="Save"
                color="blue"
                onClick={ this.handleSaveFiles }
                disabled={ !hasPopulatedLanguages }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ModalItem>
    );
  }
}

EditSupportFilesContent.propTypes = {
  data: array.isRequired,
  fileType: string,
  closeEditModal: func
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilescontent: makeSelectEditSupportFilesContent()
} );

export default connect( mapStateToProps, actions )( EditSupportFilesContent );
