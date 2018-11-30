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
import { Icon, Progress } from 'semantic-ui-react';

import './VideoItem.css';

/* eslint-disable react/prefer-stateless-function */
class VideoItem extends React.PureComponent {
  state = {
    isUploading: true,
    isUploadSuccess: false,
    error: false
  }

  render() {
    const { onClick, videoItem, displayItemInModal } = this.props;
    const {
      title,
      language,
      thumbnail,
      alt,
      fileName,
      source
    } = videoItem;

    /**
     * @todo will need to replace `true` condition with
     * state value of whether upload is complete
     * (i.e., when total filesize === total uploaded)
     */
    const { isUploading, error } = this.state;
    const { filesize } = source[0].size;
    const itemStyle = {
      cursor: isUploading ? 'not-allowed' : 'pointer'
    };
    if ( !displayItemInModal ) {
      itemStyle.cursor = 'default';
    }

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
            <img src={ thumbnail } alt={ alt } />
            <p className="file-name">{ fileName }</p>
            { isUploading &&
              <div className="loading-animation">
                <Icon
                  loading
                  name="spinner"
                  size="large"
                />
              </div> }
          </div>
          { isUploading &&
            <Progress
              /**
              * @todo determine value via passed-in state
              */
              value={ filesize * 0.72 }
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
  videoItem: object.isRequired,
  displayItemInModal: bool,
  onClick: func
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  videoItem: makeSelectVideoItem()
} );

export default connect( mapStateToProps, actions )( VideoItem );
