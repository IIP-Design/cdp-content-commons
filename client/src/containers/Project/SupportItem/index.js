/**
 *
 * SupportItem
 *
 */
import React, { Fragment } from 'react';
import { func, number, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { makeSelectSupportItem } from './selectors';
import { Icon, Loader, Progress } from 'semantic-ui-react';

import './SupportItem.css';

/* eslint-disable react/prefer-stateless-function */
class SupportItem extends React.PureComponent {
  state = {
    bytesUploaded: 0,
    nIntervId: null,
    isUploading: false
  }

  componentDidMount = () => {
    const {
      projectId,
      fileType,
      itemId,
      loadSupportItem
    } = this.props;
    loadSupportItem( projectId.videoID, fileType, itemId );

    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max interval in milliseconds
     */
    const interval = this.getRandomInt( this.MIN_INTERVAL, this.MAX_INTERVAL );
    const nIntervId = setInterval( this.uploadItem, interval );
    this.setState( { nIntervId } );
  }

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
  MIN_INTERVAL = 500;
  MAX_INTERVAL = 1500;
  MIN_MB_SEC = 1;
  MAX_MB_SEC = 5;

  incrementUpload = ( unit, min, max ) => (
    this[unit] * this.getRandomInt( min, max )
  )

  endUpload = ( intervId ) => {
    const {
      projectId,
      fileType,
      itemId,
      setUploadStatus
    } = this.props;
    clearInterval( intervId );
    setUploadStatus( projectId.videoID, fileType, itemId );
  };

  uploadItem = () => {
    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max increment in megabytes
     */
    this.setState( ( nextState ) => {
      const { filesize } = this.props.supportItem.size;
      const { bytesUploaded } = nextState;
      let increment = this.incrementUpload( 'MEGABYTE', this.MIN_MB_SEC, this.MAX_MB_SEC );
      const remainingBytes = this.getRemainingUnits( filesize, bytesUploaded );

      if ( remainingBytes < increment ) {
        increment = remainingBytes;
      }

      // continue uploading
      if ( bytesUploaded < filesize ) {
        return {
          isUploading: true,
          bytesUploaded: this.state.bytesUploaded + increment
        };
      }

      // stop uploading
      this.endUpload( nextState.nIntervId );
      return { isUploading: false };
    } );
  }

  render() {
    const {
      fileType,
      maxFileNameCharCount,
      supportItem
    } = this.props;

    if ( !supportItem || supportItem.loading ) {
      return (
        <li>
          <Loader active inline size="mini" />
          <span style={ { marginLeft: '0.5em', fontSize: '0.75em' } }>
            Preparing file for upload...
          </span>
        </li>
      );
    }

    const {
      error,
      file,
      lang,
      size,
      uploadStatus
    } = supportItem;
    const { bytesUploaded, isUploading } = this.state;
    const isLongFileName = file.length > maxFileNameCharCount;
    const uploadingClass = isUploading ? ' isUploading' : '';

    if ( error || uploadStatus.error ) {
      return (
        <li key={ `${fileType}-${lang}` } className="support-item error">
          <p>
            <Icon
              color="red"
              name="exclamation triangle"
              size="small"
            />
            <span>
              { `${supportItem.error ? 'Loading ' : 'Uploading '} error` }
            </span>
          </p>
        </li>
      );
    }

    if ( isUploading ) {
      return (
        <li key={ `${fileType}-${lang}` } className={ `support-item${uploadingClass}` }>
          <Progress
            value={ bytesUploaded }
            total={ size.filesize }
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
  supportItem: object,
  projectId: object.isRequired,
  fileType: string.isRequired,
  itemId: string.isRequired,
  maxFileNameCharCount: number,
  loadSupportItem: func,
  setUploadStatus: func
};

SupportItem.defaultProps = {
  supportItem: null,
  maxFileNameCharCount: 25
};

const mapStateToProps = () => createStructuredSelector( {
  supportItem: makeSelectSupportItem()
} );

export default connect( mapStateToProps, actions )( SupportItem );
