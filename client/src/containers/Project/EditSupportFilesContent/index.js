/**
 *
 * EditSupportFilesContent
 *
 */
import React, { Fragment } from 'react';
import { array, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFilesContent from './selectors';
import { Button, Dropdown, Grid, Icon } from 'semantic-ui-react';

import ModalItem from 'components/Modals/ModalItem/ModalItem';

import { capitalizeFirst } from '../../../utils/helpers';
import { languages } from '../mockData';

import './EditSupportFilesContent.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFilesContent extends React.PureComponent {
  state = {
    hasPopulatedLanguages: false
  }

  handleCancel = () => {
    console.log( 'cancel' );
  }

  handleAddFiles = () => {
    console.log( 'add files' );
  }

  handleSaveFiles = () => {
    console.log( 'files saved' );
  }

  renderIcons = () => (
    <Fragment>
      <Button basic style={ { padding: '0', boxShadow: 'none' } }>
        <Icon size="large" name="refresh" />
      </Button>
      <Button basic style={ { padding: '0', boxShadow: 'none' } }>
        <Icon size="large" name="delete" />
      </Button>
    </Fragment>
  )

  render() {
    const { data: files, fileType } = this.props;

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

          <Grid.Row>
            <Grid.Column mobile={ 7 }>
              madeinamerica_arabic.srt
            </Grid.Column>
            <Grid.Column mobile={ 5 }>
              <Dropdown
                value="arabic"
                options={ languages }
                selection
                style={ { width: '100%' } }
              />
            </Grid.Column>
            <Grid.Column mobile={ 4 }>
              { this.renderIcons() }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={ 7 }>
              madeinamerica_chinese.srt
            </Grid.Column>
            <Grid.Column mobile={ 5 }>
              <Dropdown
                value="chinese"
                options={ languages }
                selection
                style={ { width: '100%' } }
              />
            </Grid.Column>
            <Grid.Column mobile={ 4 }>
              { this.renderIcons() }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={ 7 }>
              madeinamerica_english.srt
            </Grid.Column>
            <Grid.Column mobile={ 5 }>
              <Dropdown
                value="english"
                options={ languages }
                selection
                style={ { width: '100%' } }
              />
            </Grid.Column>
            <Grid.Column mobile={ 4 }>
              { this.renderIcons() }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={ 7 }>
              madeinamerica_french.srt
            </Grid.Column>
            <Grid.Column mobile={ 5 }>
              <Dropdown
                value="french"
                options={ languages }
                selection
                style={ { width: '100%' } }
              />
            </Grid.Column>
            <Grid.Column mobile={ 4 }>
              { this.renderIcons() }
            </Grid.Column>
          </Grid.Row>

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
                disabled={ !this.state.hasPopulatedLanguages }
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
