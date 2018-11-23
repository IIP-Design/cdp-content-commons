/**
 *
 * VideoItem
 *
 */

import React from 'react';
import { array, object, string } from 'prop-types';
import { Icon, Progress } from 'semantic-ui-react';

import './VideoItem.css';

const VideoItem = ( props ) => {
  const {
    title,
    language,
    thumbnail,
    alt,
    fileName,
    source,
    ...rest
  } = props;

  const { filesize } = source[0].size;

  /**
   * @todo will need to replace `true` condition with
   * state value of whether upload is complete
   * (i.e., when total filesize === total uploaded)
   */
  const isUploading = true;

  /**
   * Duplicate props to avoid unknown prop warning
   * @see https://reactjs.org/warnings/unknown-prop.html
   */
  const itemProps = { ...rest };
  delete itemProps.desc;
  delete itemProps.additionalKeywords;

  const itemStyle = {
    flexBasis: '15em',
    marginRight: '1em',
    cursor: isUploading ? 'not-allowed' : 'pointer'
  };

  return (
    <li className="item video" style={ itemStyle } { ...itemProps }>
      <div className={ `thumbnail${isUploading ? ' uploading' : ''}` }>
        <img src={ thumbnail } alt={ alt } />
        <p className="file-name">{ fileName }</p>
        { isUploading &&
          <div className="loading-animation">
            <Icon
              loading
              name="spinner"
              size="big"
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
    </li>
  );
};

VideoItem.propTypes = {
  title: string,
  language: object,
  thumbnail: string,
  alt: string,
  fileName: string,
  source: array,
  rest: object
};

export default VideoItem;
