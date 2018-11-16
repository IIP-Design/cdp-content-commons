/**
 *
 * StatusMessages
 *
 */

import React, { Fragment } from 'react';
import { bool, string } from 'prop-types';
// import './StatusMessages.css';

import { Icon } from 'semantic-ui-react';

import Notification from 'components/Project/Notification/Loadable';

const StatusMessages = ( props ) => {
  const {
    hasSubmittedData,
    displayTheUploadSuccessMsg,
    displayTheSaveMsg,
    notificationMsg
  } = props;

  const msgStyles = { margin: '0', padding: '1em 1.75em' };

  return (
    <Fragment>
      { !hasSubmittedData &&
        <p style={ msgStyles }>
          <strong>Fill out the required fields to finish setting up this project.</strong> Your files will not be uploaded until the project is saved as a draft.
        </p> }

      { displayTheUploadSuccessMsg &&
        <p style={ msgStyles }>
          <Icon size="large" name="check circle outline" /> Files uploaded successfully!
        </p> }

      { displayTheSaveMsg &&
        <Notification
          customStyles={ {
            position: 'absolute',
            top: '11em',
            left: '50%',
            transform: 'translateX(-50%)'
            } }
          msg={ notificationMsg }
        /> }
    </Fragment>
  );
};

StatusMessages.propTypes = {
  hasSubmittedData: bool,
  displayTheUploadSuccessMsg: bool,
  displayTheSaveMsg: bool,
  notificationMsg: string
};

export default StatusMessages;
