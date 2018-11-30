/**
 *
 * StatusMessages
 *
 */

import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import colors from '../../../../utils/colors';

const StatusMessages = ( props ) => {
  const {
    hasSubmittedData,
    displayTheUploadSuccessMsg
  } = props;

  const baseStyles = {
    margin: '0',
    padding: '0.625em 1.75em',
    backgroundColor: colors.blueGreen,
    textAlign: 'center'
  };

  const draftMsgStyles = {
    ...baseStyles,
    padding: '0.625em 1.75em 1.5em',
    backgroundColor: colors.white
  };

  const successStyles = {
    ...baseStyles,
    backgroundColor: colors.pear,
    textAlign: 'initial'
  };

  return (
    <Fragment>
      { !hasSubmittedData &&
        <Fragment>
          <p style={ baseStyles }>
            <strong>Fill out the required fields to finish setting up this project.</strong>
          </p>
          <p style={ draftMsgStyles }>Your files will not be uploaded until the project is saved as a draft.
          </p>
        </Fragment> }

      { displayTheUploadSuccessMsg &&
        <p style={ successStyles }>
          <Icon size="large" name="check circle outline" /> Files uploaded successfully!
        </p> }
    </Fragment>
  );
};

StatusMessages.propTypes = {
  hasSubmittedData: bool,
  displayTheUploadSuccessMsg: bool
};

export default StatusMessages;
