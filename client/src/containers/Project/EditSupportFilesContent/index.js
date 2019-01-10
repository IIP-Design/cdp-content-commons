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
import VisuallyHidden from 'components/VisuallyHidden';

import EditSupportFileRow from 'containers/Project/EditSupportFileRow';

import { capitalizeFirst } from '../../../utils/helpers';

import './EditSupportFilesContent.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFilesContent extends React.PureComponent {
  state = {
    hasPopulatedLanguages: false,
    hasSaved: false,
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

  handleChange = ( e, { id, value } ) => (
    this.setState(
      prevState => ( {
        selectedLangValues: {
          ...prevState.selectedLangValues,
          [id]: capitalizeFirst( value )
        }
      } ),
      this.haveAllLangsBeenPopulated
    )
  )

  handleCancelClose = () => {
    console.log( 'cancel' );
    this.props.closeEditModal();
  }

  handleSaveFiles = () => {
    console.log( 'files saved' );
    this.setState( { hasSaved: true } );
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
    const { id } = file;
    const { selectedLangValues } = this.state;
    const { data: files, fileType } = this.props;

    return (
      <EditSupportFileRow
        key={ id }
        file={ file }
        fileType={ fileType }
        fileExtensions={ this.getFileExtensions( files ) }
        handleChange={ this.handleChange }
        selectedLanguage={ selectedLangValues[id] }
      />
    );
  }

  render() {
    const { data: files, fileType } = this.props;
    const { hasPopulatedLanguages, hasSaved } = this.state;

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
                className="cancel-close"
                content={ hasSaved ? 'Close' : 'Cancel' }
                basic
                onClick={ this.handleCancelClose }
              />
              <Button
                className="add-files"
                content="Add Files"
                color="blue"
                basic
                onClick={ this.handleAddFiles }
              />
              <VisuallyHidden>
                { /* eslint-disable jsx-a11y/label-has-for */ }
                <label htmlFor="upload-file--multiple">upload files</label>
                <input
                  id="upload-file--multiple"
                  ref={ this.handleAddFilesRef }
                  type="file"
                  multiple
                />
              </VisuallyHidden>
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
