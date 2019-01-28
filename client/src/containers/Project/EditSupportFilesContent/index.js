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
import { Button, Form, Table } from 'semantic-ui-react';

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import VisuallyHidden from 'components/VisuallyHidden';
import Notification from 'components/Project/Notification/Loadable';

import EditSupportFileRow from 'containers/Project/EditSupportFileRow';

import { capitalizeFirst, delayFnCall } from '../../../utils/helpers';

import './EditSupportFilesContent.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFilesContent extends React.PureComponent {
  constructor( props ) {
    super( props );

    this.SAVE_MSG_DELAY = 2000;
    this._isMounted = false;

    this.state = {
      displaySaveMsg: false,
      hasSaved: false,
      hasUnsavedData: false,
      hasPopulatedLanguages: false,
      selectedLangValues: {}
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
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
        hasUnsavedData: true,
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

  handleSubmit = () => {
    console.log( 'files saved' );
    this.setState(
      {
        displaySaveMsg: true,
        hasSaved: true,
        hasUnsavedData: false
      },
      () => delayFnCall( this.handleDisplaySaveMsg, this.saveMsgTimer, this.SAVE_MSG_DELAY )
    );
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

  handleDisplaySaveMsg = () => {
    if ( this._isMounted ) {
      this.setState( { displaySaveMsg: false } );
    }
    this.saveMsgTimer = null;
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
    const {
      displaySaveMsg,
      hasSaved,
      hasUnsavedData,
      hasPopulatedLanguages
    } = this.state;

    const headline = fileType === 'srt'
      ? fileType.toUpperCase()
      : capitalizeFirst( fileType );

    const notificationStyles = {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      // match Semantic UI border-radius
      borderBottomLeftRadius: '0.28571429rem',
      borderBottomRightRadius: '0.28571429rem',
      padding: '1em 1.5em',
      fontSize: '1em'
    };

    const notificationMsg = displaySaveMsg ? 'Saved' : 'You have unsaved data';
    const saveBtnMsg = hasSaved && !hasUnsavedData ? 'Data Saved' : 'Save';

    return (
      <ModalItem
        customClassName={ `edit-support-files ${fileType}` }
        headline={ `Edit ${headline} file${files.length > 1 ? 's' : ''} in this project` }
        textDirection="ltr"
      >

        { ( displaySaveMsg || hasUnsavedData ) &&
          <Notification
            el="p"
            customStyles={ notificationStyles }
            msg={ notificationMsg }
          /> }

        { /**
           * onSubmit prop not used because of Semantic UI
           * bug where a form inside a modal does not
           * submit when clicking enter.
           */ }
        <Form>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={ 9 }>
                  { `${headline} File${files.length > 1 ? 's' : ''} Selected` }
                </Table.HeaderCell>
                <Table.HeaderCell width={ 4 }>
                  Language
                  <small className="msg--required"> *</small>
                </Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { files.map( this.renderRow ) }
            </Table.Body>
          </Table>

          <div className="btn-group">
            <Button
              className="cancel-close"
              content={ hasSaved ? 'Close' : 'Cancel' }
              basic
              onClick={ this.handleCancelClose }
              type="button"
            />
            <Button
              className="add-files"
              content="Add Files"
              color="blue"
              basic
              onClick={ this.handleAddFiles }
              type="button"
            />
            <VisuallyHidden>
              { /* eslint-disable jsx-a11y/label-has-for */ }
              <label htmlFor="upload-file--multiple">upload files</label>
              <input
                id="upload-file--multiple"
                ref={ this.handleAddFilesRef }
                type="file"
                multiple
                tabIndex={ -1 }
              />
            </VisuallyHidden>
            <Button
              className="save"
              content={ saveBtnMsg }
              color="blue"
              disabled={ !hasPopulatedLanguages || ( hasSaved && !hasUnsavedData ) }
              onClick={ this.handleSubmit }
              type="submit"
            />
          </div>
        </Form>
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
