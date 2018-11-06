/**
 *
 * Notification
 *
 */

import React from 'react';
import { object, string } from 'prop-types';


const Notification = ( props ) => {
  const { msg, customStyles } = props;
  const defaultStyle = {
    padding: '1em 1.5em',
    fontSize: '0.625em',
    backgroundColor: '#b9de52'
  };

  const style = { ...defaultStyle, ...customStyles };

  return <p style={ style }>{ msg }</p>;
};

Notification.propTypes = {
  msg: string.isRequired,
  customStyles: object
};

export default Notification;
