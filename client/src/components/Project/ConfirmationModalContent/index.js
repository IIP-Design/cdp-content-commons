/**
 *
 * ConfirmationModalContent
 *
 */

import React from 'react';
import { node, object, string } from 'prop-types';
import './ConfirmationModalContent.css';

/* eslint-disable react/prefer-stateless-function */
const ConfirmationModalContent = ( props ) => {
  const {
    children,
    className,
    headingTxt,
    style
  } = props;

  return (
    <div className={ className } style={ style }>
      <h2>{ headingTxt }</h2>
      { children }
    </div>
  );
};

ConfirmationModalContent.propTypes = {
  children: node,
  className: string,
  headingTxt: string,
  style: object
};

ConfirmationModalContent.defaultProps = {
  style: {}
};

export default ConfirmationModalContent;
