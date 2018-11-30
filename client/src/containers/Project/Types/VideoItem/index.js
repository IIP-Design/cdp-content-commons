/**
 *
 * VideoItem
 *
 */
import React from 'react';
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectVideoItem from './selectors';
import { Icon, Loader, Progress } from 'semantic-ui-react';

import './VideoItem.css';

/* eslint-disable react/prefer-stateless-function */
class VideoItem extends React.PureComponent {
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

  getFileSize = () => (
    this.props.videoItem.source[0].size.filesize
  )

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
          bytesUploaded: this.state.bytesUploaded + increment,
          isUploading: true
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
    const { onClick, videoItem, displayItemInModal } = this.props;
    const {
      title,
      language,
      thumbnail,
      alt,
      fileName
    } = videoItem;

    const {
      fileSizeBytes,
      bytesUploaded,
      isUploading,
      error
    } = this.state;

    const itemStyle = {
      cursor: isUploading ? 'not-allowed' : 'pointer'
    };
    if ( !displayItemInModal ) itemStyle.cursor = 'default';

    const uploadingClass = isUploading ? ' isUploading' : '';
    const Wrapper = !isUploading && displayItemInModal ? 'button' : 'span';
    const wrapperClass = displayItemInModal ? 'modal-trigger' : 'wrapper';

    if ( error ) {
      return (
        <li className="item video error" style={ { textAlign: 'center' } }>
          <Icon
            color="red"
            name="exclamation triangle"
            size="large"
          />
          <p>An uploading error occurred for this item.</p>
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
            { thumbnail && <img src={ thumbnail } alt={ alt } /> }
            <p className="file-name">{ fileName }</p>
            { isUploading &&
              <div className="loading-animation">
                <Loader active inline="centered" />
              </div> }
          </div>
          { isUploading &&
            <Progress
              value={ bytesUploaded }
              total={ fileSizeBytes }
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
  videoItem: object.isRequired,
  displayItemInModal: bool,
  onClick: func
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoItem: makeSelectVideoItem()
} );

export default connect( mapStateToProps, actions )( VideoItem );
