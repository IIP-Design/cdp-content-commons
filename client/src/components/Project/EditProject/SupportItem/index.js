/**
 *
 * SupportItem
 *
 */

import React from 'react';
import { bool, object, string } from 'prop-types';

import Placeholder from 'components/Project/Placeholder';


const SupportItem = ( props ) => {
  const { fileType, item, isAvailable } = props;

  if ( isAvailable ) {
    return (
      <li key={ `${fileType}-${item.lang}` } className="support-item">
        { item.file }
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
  isAvailable: bool
};

export default SupportItem;
