/**
 *
 * FormInstructions
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

import colors from '../../../../utils/colors';

const FormInstructions = ( props ) => {
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

  return (
    <Fragment>
      <p style={ baseStyles }>
        <strong>Fill out the required fields to finish setting up this project.</strong>
      </p>
      <p style={ draftMsgStyles }>Your files will not be uploaded until the project is saved as a draft.
      </p>
    </Fragment>
  );
};

FormInstructions.propTypes = {};

export default FormInstructions;
