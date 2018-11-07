/**
 *
 * SupportItem
 *
 */

import React from 'react';
import { bool, object, string } from 'prop-types';


const SupportItem = ( props ) => {
  const { fileType, item, isAvailable } = props;
  const placeholderStyle = {
    filter: 'blur(4px)'
  };

  return (
    <li key={ `${fileType}-${item.lang}` } className="support-item" style={ !isAvailable ? placeholderStyle : null }>
      { item.file }
      <b className="item-lang">{ item.lang }</b>
    </li>
  );
};

SupportItem.propTypes = {
  fileType: string,
  item: object.isRequired,
  isAvailable: bool
};

export default SupportItem;
