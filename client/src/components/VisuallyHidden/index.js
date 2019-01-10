/**
 *
 * VisuallyHidden
 *
 */

import React from 'react';
import { object } from 'prop-types';
import './VisuallyHidden.css';

const VisuallyHidden = props => (
  <div className="hide-visually">{ props.children }</div>
);

VisuallyHidden.propTypes = {
  children: object
};

export default VisuallyHidden;
