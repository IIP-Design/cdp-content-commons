import React from 'react';
import { string, array } from 'prop-types';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import './EmbedCode.css';

const EmbedCode = props => (
  <div>
    <div className="tab_instructions">{ props.instructions }</div>
    <ClipboardCopy label="Embed Code" copyItem="[PROPS.EMBED_CODE]" />
    { props.children }
  </div>
);

EmbedCode.propTypes = {
  instructions: string,
  children: array
};

export default EmbedCode;
