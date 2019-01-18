import React from 'react';
import { string } from 'prop-types';
import { List } from 'semantic-ui-react';
import { openWindow, isMobile } from '../../utils/browser';

const ShareButton = ( {
  action, icon, label, url
} ) => {
  /**
   * Opens a new window. If mobile, go a new window, else open popup window
   * Calling this function as opposed to directly calling openWindow allows
   * us to fetch window config if present on the element. It also does not force
   * deaking with the event object in the openWindow method
   * @param {*} e event object
   * @param {*} data element data attributes
   */
  const willOpenWindow = ( e, data = {} ) => {
    if ( !isMobile() ) {
      e.preventDefault();
      openWindow( url, data );
    }
  };

  return (
    <List.Item
      as="a"
      data-action={ action }
      href={ url }
      target="_blank"
      onClick={ willOpenWindow }
      onKeyPress={ willOpenWindow }
    >
      <List.Icon name={ icon } size="large" />
      <List.Content>{ label }</List.Content>
    </List.Item>
  );
};

ShareButton.propTypes = {
  action: string,
  icon: string,
  label: string,
  url: string
};

export default ShareButton;
