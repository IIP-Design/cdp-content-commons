/**
 *
 * VideoItem
 *
 */
import React, { Fragment } from 'react';
import { bool, func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoItem from './selectors';
import { Icon, Loader, Progress } from 'semantic-ui-react';

import './VideoItem.css';

/* eslint-disable react/prefer-stateless-function */
class VideoItem extends React.PureComponent {
  state = {
    bytesUploaded: 0,
    nIntervId: null,
    isUploading: false
  }

  componentDidMount = () => {
    const { videoID, itemId, loadVideoItem } = this.props;
    loadVideoItem( videoID, itemId );

    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max interval in milliseconds
     */
    const interval = this.getRandomInt( 500, 1500 );
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

  incrementUpload = ( unit, min, max ) => (
    this[unit] * this.getRandomInt( min, max )
  )

  endUpload = ( intervId ) => {
    const {
      videoID,
      itemId,
      setUploadStatus
    } = this.props;
    clearInterval( intervId );
    setUploadStatus( videoID, itemId );
  };

  uploadItem = () => {
    /**
     * @todo simulate upload for dev purposes;
     * replace for production
     * min, max increment in megabytes
     */
    this.setState( ( nextState ) => {
      const { filesize } = this.props.video.source[0].size;
      const { bytesUploaded } = nextState;

      const remainingBytes = this.getRemainingUnits( filesize, bytesUploaded );
      let increment = this.incrementUpload( 'MEGABYTE', 400, 500 );

      if ( remainingBytes < increment ) {
        increment = remainingBytes;
      }

      // continue uploading
      if ( bytesUploaded < filesize ) {
        return {
          bytesUploaded: this.state.bytesUploaded + increment,
          isUploading: true
        };
      }

      // stop uploading
      this.endUpload( nextState.nIntervId );
      return { isUploading: false };
    } );
  }

  render() {
    const {
      onClick,
      video,
      displayItemInModal
    } = this.props;

    if ( !video || video.loading ) {
      return (
        <Loader active inline="centered">
          <p style={ { fontSize: '0.75em' } }>
            Preparing file for upload...
          </p>
        </Loader>
      );
    }

    const {
      title,
      language,
      thumbnail,
      alt,
      fileName,
      source,
      error,
      uploadStatus
    } = video;

    const { filesize } = source[0].size;
    const { bytesUploaded, isUploading } = this.state;

    const itemStyle = {
      cursor: isUploading ? 'not-allowed' : 'pointer'
    };
    if ( !displayItemInModal ) itemStyle.cursor = 'default';

    const uploadingClass = isUploading ? ' isUploading' : '';
    const Wrapper = !isUploading && displayItemInModal ? 'button' : 'span';
    const wrapperClass = displayItemInModal ? 'modal-trigger' : 'wrapper';

    if ( error || uploadStatus.error ) {
      return (
        <li className="item video error" style={ { textAlign: 'center' } }>
          <Icon
            color="red"
            name="exclamation triangle"
            size="large"
          />
          <p style={ { fontSize: '0.75em' } }>
            { `${error ? 'A loading' : 'An uploading'} error occurred for this item.` }
          </p>
        </li>
      );
    }

    return (
      <li className="item video">
        <Wrapper
          className={ wrapperClass }
          onClick={
            !isUploading && displayItemInModal ? onClick : null
          }
          style={ itemStyle }
        >
          <div className={ `thumbnail${uploadingClass}` }>
            { thumbnail &&
              <Fragment>
                <img src={ thumbnail } alt={ alt } />
                <p className="file-name">{ fileName }</p>
              </Fragment> }
            { isUploading &&
              <div className="loading-animation">
                <Loader active inline="centered" />
              </div> }
          </div>
          { isUploading &&
            <Progress
              value={ bytesUploaded }
              total={ filesize }
              color="blue"
              size="small"
              active
              progress
              precision={ 0 }
            >
              <p>Upload in progress</p>
            </Progress> }
          <h3 className={ `item-heading ${language.text_direction}` }>{ title }</h3>
          <p className="item-lang">{ language.display_name }</p>
        </Wrapper>
      </li>
    );
  }
}

VideoItem.propTypes = {
  video: object,
  displayItemInModal: bool,
  onClick: func,
  videoID: string.isRequired,
  itemId: string.isRequired,
  loadVideoItem: func,
  setUploadStatus: func
};

const mapStateToProps = () => createStructuredSelector( {
  video: makeSelectVideoItem()
} );

export default connect( mapStateToProps, actions )( VideoItem );
