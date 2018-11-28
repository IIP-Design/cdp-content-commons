/**
 *
 * SupportItem
 *
 */

import React from 'react';
import { bool, number, object, string } from 'prop-types';

import Placeholder from 'components/Project/Placeholder';


const SupportItem = ( props ) => {
  const {
    fileType,
    item,
    isAvailable,
    maxFileNameCharCount
  } = props;

  const isLongFileName = item.file.length > maxFileNameCharCount;

  if ( isAvailable ) {
    return (
      <li
        key={ `${fileType}-${item.lang}` }
        className={ `support-item${isLongFileName ? ' long' : ''}` }
      >
        <span className="item-name">{ item.file }</span>
        <b className="item-lang">{ item.lang }</b>
      </li>
    );
  }

  return (
    <Placeholder
      parentEl="li"
      childEl="span"
      parentStyles={ {
        display: 'flex',
        justifyContent: 'space-between'
      } }
      childStyles={ {
        fileName: { width: '75%' },
        language: {
          width: '20%',
          marginRight: '0',
          backgroundColor: '#5b616b'
        }
      } }
    />
  );
};

SupportItem.propTypes = {
  fileType: string,
  item: object.isRequired,
  isAvailable: bool,
  maxFileNameCharCount: number
};

SupportItem.defaultProps = {
  maxFileNameCharCount: 25
};

export default SupportItem;
