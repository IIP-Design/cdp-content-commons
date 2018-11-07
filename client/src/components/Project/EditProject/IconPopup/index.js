/**
 *
 * IconPopup
 *
 */

import React from 'react';
import { string } from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';


const IconPopup = ( props ) => {
  const { message, size, iconType } = props;
  return (
    <Popup
      trigger={ <Icon size={ size } name={ iconType } /> }
      content={ message }
      size={ size }
      inverted
    />
  );
};

IconPopup.propTypes = {
  message: string.isRequired,
  size: string,
  iconType: string.isRequired
};

export default IconPopup;
