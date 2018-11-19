/**
 *
 * VideoItem
 *
 */

import React from 'react';
import { object, string } from 'prop-types';
import './VideoItem.css';

const VideoItem = ( props ) => {
  const {
    title,
    language,
    thumbnail,
    alt,
    fileName,
    ...rest
  } = props;

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
    cursor: 'pointer'
  };

  return (
    <li className="item video" style={ itemStyle } { ...itemProps }>
      <div className="thumbnail">
        <img src={ thumbnail } alt={ alt } />
        <p className="file-name">{ fileName }</p>
      </div>
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
  rest: object
};

export default VideoItem;
