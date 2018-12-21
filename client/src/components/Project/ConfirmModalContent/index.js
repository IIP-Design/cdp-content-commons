/**
 *
 * ConfirmModalContent
 *
 */

import React from 'react';
import { node, object, string } from 'prop-types';
import './ConfirmModalContent.css';

/* eslint-disable react/prefer-stateless-function */
const ConfirmModalContent = ( props ) => {
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

ConfirmModalContent.propTypes = {
  children: node,
  className: string,
  headingTxt: string,
  style: object
};

ConfirmModalContent.defaultProps = {
  style: {}
};

export default ConfirmModalContent;
