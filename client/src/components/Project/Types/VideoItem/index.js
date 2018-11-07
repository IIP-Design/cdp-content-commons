/**
 *
 * VideoItem
 *
 */

import React from 'react';
import { object, string } from 'prop-types';
// import './VideoItem.css';

const VideoItem = ( props ) => {
  const {
    title,
    language,
    textDirection,
    thumbnail,
    alt,
    ...rest
  } = props;

  /**
   * Duplicate props to avoid unknown prop warning
   * @see https://reactjs.org/warnings/unknown-prop.html
   */
  const itemProps = { ...rest };
  delete itemProps.fileName;
  delete itemProps.fileSize;
  delete itemProps.subtitlesCaptions;
  delete itemProps.videoType;
  delete itemProps.publicDesc;
  delete itemProps.youTubeUrl;
  delete itemProps.additionalKeywords;

  const itemStyle = {
    flexBasis: '25%',
    marginRight: '1rem',
    cursor: 'pointer'
  };

  return (
    <li className="video" style={ itemStyle } { ...itemProps }>
      <img
        src={ thumbnail }
        alt={ alt }
        className="thumbnail"
      />
      <h3
        className={ textDirection }
        style={ { marginTop: '0' } }
      >
        { title }
      </h3>
      <p style={ { textTransform: 'capitalize' } }>{ language }</p>
    </li>
  );
};

VideoItem.propTypes = {
  title: string,
  language: string,
  textDirection: string,
  thumbnail: string,
  alt: string,
  fileName: string,
  rest: object
};

export default VideoItem;
