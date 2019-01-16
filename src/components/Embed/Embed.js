import React from 'react';
import { string, array } from 'prop-types';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import './Embed.css';

const Embed = ( props ) => {
  const embedItem = props.embedItem ? props.embedItem : '';
  const title = props.title ? props.title : '';

  return (
    <div>
      <div className="form-group_instructions">{ props.instructions }</div>
      <ClipboardCopy label="Embed Code" copyItem={ embedItem } itemAction={ `copyEmbed - ${title}` } />
      { props.children }
    </div>
  );
};

Embed.propTypes = {
  instructions: string,
  children: array,
  embedItem: string,
  title: string
};

export default Embed;
