/**
 *
 * SupportItem
 *
 */
import React from 'react';
import { number, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectSupportItem from './selectors';
import { Icon, Progress } from 'semantic-ui-react';

import './SupportItem.css';

/* eslint-disable react/prefer-stateless-function */
class SupportItem extends React.PureComponent {
  state = {
    fileSizeBytes: 0,
    bytesUploaded: 0,
    nIntervId: null,
    isUploading: false,
    isUploadSuccess: false,
    error: false
  }

  componentWillMount = () => {
    this.setState( {
      fileSizeBytes: this.getFileSize()
    } );
  }

  componentDidMount = () => {
    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max interval in milliseconds
     */
    const interval = this.getRandomInt( 500, 1500 );
    const nIntervId = setInterval( this.uploadItem, interval );
    this.setState( { nIntervId } );
  }

  getFileSize = () => this.props.supportItem.size.filesize;

  /**
   * @todo simulate upload for dev purposes;
   * replace for production
   */
  getRandomInt = ( min, max ) => {
    min = Math.ceil( min );
    max = Math.floor( max );
    return (
      Math.floor( Math.random() * ( ( max - min ) + 1 ) ) + min
    );
  }

  getRemainingUnits = ( totalUnits, unitsUploaded ) => (
    totalUnits - unitsUploaded
  )

  /**
   * @todo simulate upload for dev purposes;
   * replace for production
   * 1MB = 1,048,576 Bytes
   */
  MEGABYTE = 1048576;

  incrementUpload = ( unit, min, max ) => (
    this[unit] * this.getRandomInt( min, max )
  )

  endUpload = intervId => clearInterval( intervId );

  uploadItem = () => {
    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max increment in megabytes
     */
    this.setState( ( nextState ) => {
      const { fileSizeBytes, bytesUploaded } = nextState;
      let increment = this.incrementUpload( 'MEGABYTE', 10, 50 );
      const remainingBytes = this.getRemainingUnits( fileSizeBytes, bytesUploaded );

      if ( remainingBytes < increment ) {
        increment = remainingBytes;
      }

      // continue uploading
      if ( bytesUploaded < fileSizeBytes ) {
        return {
          isUploading: true,
          bytesUploaded: this.state.bytesUploaded + increment
        };
      }

      // stop uploading
      this.endUpload( nextState.nIntervId );
      return {
        isUploading: false,
        isUploadSuccess: true
      };
    } );
  }

  render() {
    const {
      fileType,
      maxFileNameCharCount,
      supportItem
    } = this.props;

    const { file, lang } = supportItem;

    const {
      fileSizeBytes,
      bytesUploaded,
      isUploading,
      error
    } = this.state;

    const isLongFileName = file.length > maxFileNameCharCount;
    const uploadingClass = isUploading ? ' isUploading' : '';

    if ( error ) {
      return (
        <li key={ `${fileType}-${lang}` } className="support-item error">
          <p>
            <Icon
              color="red"
              name="exclamation triangle"
              size="small"
            />
            <span>Uploading error</span>
          </p>
        </li>
      );
    }

    if ( isUploading ) {
      return (
        <li key={ `${fileType}-${lang}` } className={ `support-item${uploadingClass}` }>
          <Progress
            value={ bytesUploaded }
            total={ fileSizeBytes }
            color="blue"
            size="small"
            active
            progress
            precision={ 0 }
          />
          <span>Uploading item</span>
        </li>
      );
    }

    return (
      <li
        key={ `${fileType}-${lang}` }
        className={ `support-item${isLongFileName ? ' long' : ''}` }
      >
        <span className="item-name">{ file }</span>
        <b className="item-lang">{ lang }</b>
      </li>
    );
  }
}

SupportItem.propTypes = {
  supportItem: object.isRequired,
  projectId: object.isRequired,
  fileType: string,
  itemId: string.isRequired,
  maxFileNameCharCount: number
};

SupportItem.defaultProps = {
  maxFileNameCharCount: 25
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  supportItem: makeSelectSupportItem()
} );

export default connect( mapStateToProps, actions )( SupportItem );
