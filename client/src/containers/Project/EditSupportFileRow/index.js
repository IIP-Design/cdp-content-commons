/**
 *
 * EditSupportFileRow
 *
 */
import React, { Fragment } from 'react';
import { array, func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFileRow from './selectors';
import { Button, Dropdown, Popup, Table } from 'semantic-ui-react';

import Focusable from 'components/Focusable';
import VisuallyHidden from 'components/VisuallyHidden';
import { languages } from '../mockData';

import './EditSupportFileRow.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFileRow extends React.PureComponent {
  state = {
    cellWidth: null,
    fileNameWidth: null
  }

  componentDidMount = () => {
    window.addEventListener( 'resize', this.debounceResize );
  }

  componentWillUnmount = () => {
    window.removeEventListener( 'resize', this.debounceResize );
  }

  /**
   * Truncates long strings with ellipsis
   * @param {string} str the string
   * @param {number} start index for first cutoff point
   * @param {number} end index for ending cutoff point
   * @return truncated string
   */
  getShortFileName = ( str, index ) => (
    <Fragment>
      { `${str.substr( 0, index )}` }&hellip;{ `${str.substr( -index )}` }
    </Fragment>
  );

  /**
   * Determines an integer proportional
   * to a reference number
   * @param {number} reference
   * @return {number}
   */
  getProportionalNumber = ( reference, proportion ) => (
    Math.floor( reference * proportion )
  )

  setReplaceFileRef = ( input ) => {
    this.addReplaceFileRef = input;
  }

  /**
   * Declares a React ref & sets its width in state
   * @param {node} React node
   * @param {string} name of React ref
   */
  setRefWidth = ( node, ref ) => {
    if ( node ) {
      this.setState( ( prevState ) => {
        if ( !prevState[`${ref}Width`] ) {
          return ( {
            [`${ref}Width`]: Math.ceil( node.offsetWidth )
          } );
        }
      } );
    }
  }

  resetWidths = () => {
    this.setState( {
      cellWidth: null,
      fileNameWidth: null
    } );
  }

  isLongName = ( itemWidth, reference, proportion ) => (
    itemWidth >= this.getProportionalNumber( reference, proportion )
  );

  handleReplaceFile = () => {
    console.log( 'replace file' );
    this.addReplaceFileRef.click();
  }

  handleDeleteFile = () => {
    console.log( 'delete file' );
  }

  DELAY_INTERVAL = 1000;
  STR_INDEX_PROPORTION = 0.04;
  ITEM_NAME_PROPORTION = 0.85;

  debounceResize = debounce( this.resetWidths, this.DELAY_INTERVAL );

  renderIcons = () => {
    const { fileExtensions, fileType } = this.props;
    const isSingleType = fileExtensions.length === 1;
    const isOther = fileType === 'other';
    const acceptedTypes = isSingleType && !isOther ? fileExtensions[0] : '';

    return (
      <Button.Group basic size="massive">
        <Popup
          content="Replace"
          size="small"
          inverted
          on={ [
            'hover',
            'click',
            'focus'
          ] }
          trigger={
            <Button
              className="replace"
              icon="refresh"
              onClick={ this.handleReplaceFile }
              basic
              aria-label="replace file"
            />
          }
        />
        <VisuallyHidden>
          { /* eslint-disable jsx-a11y/label-has-for */ }
          <label htmlFor="upload-file--single">upload file</label>
          <input
            id="upload-file--single"
            ref={ this.setReplaceFileRef }
            type="file"
            accept={ acceptedTypes }
            tabIndex={ -1 }
          />
        </VisuallyHidden>
        <Popup
          content="Delete"
          size="small"
          inverted
          on={ [
            'hover',
            'click',
            'focus'
          ] }
          trigger={
            <Button
              className="delete"
              icon="delete"
              onClick={ this.handleDeleteFile }
              basic
              aria-label="delete file"
            />
          }
        />
      </Button.Group>
    );
  }

  render() {
    const { file, handleChange, selectedLanguage } = this.props;
    const { file: fileName, id } = file;
    const { cellWidth, fileNameWidth } = this.state;

    const charIndex = this.getProportionalNumber( fileNameWidth, this.STR_INDEX_PROPORTION );

    const shortFileName = this.getShortFileName( fileName, charIndex );

    const isLongFileName = this.isLongName( fileNameWidth, cellWidth, this.ITEM_NAME_PROPORTION );

    const popupStyle = {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      '-ms-word-break': 'break-all',
      wordBreak: 'break-word'
    };

    return (
      <Table.Row>
        <Table.Cell>
          <div
            className="file-name"
            ref={ node => this.setRefWidth( node, 'cell' ) }
          >
            { isLongFileName && <VisuallyHidden>{ fileName }</VisuallyHidden> }
            <span
              className={
                `file-name-wrap${isLongFileName ? ' hasEllipsis' : ''}`
              }
              aria-hidden={ isLongFileName }
              ref={ node => this.setRefWidth( node, 'fileName' ) }
            >
              { isLongFileName ?
                <Popup
                  trigger={
                    <span>
                      <Focusable>{ shortFileName }</Focusable>
                    </span>
                  }
                  content={ fileName }
                  on={ [
                    'hover', 'click', 'focus'
                  ] }
                  inverted
                  size="small"
                  style={ popupStyle }
                /> :
                fileName }
            </span>
          </div>
        </Table.Cell>

        <Table.Cell>
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
            placeholder="–"
            text={ selectedLanguage }
            value={ selectedLanguage }
            error={ !selectedLanguage }
            fluid
            required
            selection
          />
        </Table.Cell>

        <Table.Cell>{ this.renderIcons() }</Table.Cell>
      </Table.Row>
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
