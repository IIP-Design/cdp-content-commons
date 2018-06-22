import React from 'react';
import { array } from 'prop-types';

const HelpText = props => (
  <div>{ props.children }</div>
);

HelpText.propTypes = {
  children: array
};

export default HelpText;
