/**
 *
 * EditSupportFilesContent
 *
 */
import React from 'react';
import { array, string } from 'prop-types';
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

  handleChange = ( e, { value } ) => (
    this.setState( prevState => ( {
      selectedLangValues: {
        ...prevState.selectedLangValues,
        [value]: capitalizeFirst( value )
      }
    } ) )
  )

  handleCancel = () => {
    console.log( 'cancel' );
  }

  handleAddFiles = () => {
    console.log( 'add files' );
  }

  handleSaveFiles = () => {
    console.log( 'files saved' );
  }

  renderRow = ( file ) => {
    const { id, lang } = file;
    const { selectedLangValues } = this.state;
    return (
      <EditSupportFileRow
        key={ id }
        file={ file }
        handleChange={ this.handleChange }
        selectedLanguage={ selectedLangValues[lang] }
      />
    );
  }

  render() {
    const { data: files, fileType } = this.props;
    const { hasPopulatedLanguages, selectedLangValues } = this.state;
    console.log( selectedLangValues );

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
            </Grid.Column>
            <Grid.Column mobile={ 4 } />
          </Grid.Row>

          { files.map( this.renderRow ) }

          <Grid.Row>
            <Grid.Column>
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
  fileType: string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilescontent: makeSelectEditSupportFilesContent()
} );

export default connect( mapStateToProps, actions )( EditSupportFilesContent );
