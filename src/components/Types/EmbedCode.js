import React from 'react';
import moment from 'moment';
import { string, array, object, bool } from 'prop-types';
import colors from '../../utils/colors';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import './EmbedCode.css';

const EmbedCode = ( props ) => {
  const { embedItem, keepStyles } = props;
  const cryptoRandomVal = new Uint32Array( 1 );
  const crypto = window.crypto || window.msCrypto;
  crypto.getRandomValues( cryptoRandomVal );

  const embedStyles = `<style type='text/css'>
    @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700);
    #CDPSyndication_${cryptoRandomVal} {
      max-width: 992px; 
      padding: 15px;
      margin: 0 auto;
      font-family: 'Source Sans Pro';
      font-size: 18px;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.87);
    }
    #CDPSyndication_${cryptoRandomVal} h1 { color: ${colors.blue} } 
    #CDPSyndication_${cryptoRandomVal} img { max-width: 100%; height: auto; }
    #CDPSyndication_${cryptoRandomVal} .cdp_thumbnail { width: 100%; }
    #CDPSyndication_${cryptoRandomVal} .cdp_date, .cdp_metadata {
      font-size: 12px;
      color: ${colors.grey};
    }
    #CDPSyndication_${cryptoRandomVal} .cdp_metadata > p { margin: 0; }
    </style>`;

  const embedCategories = embedItem.categories.reduce( ( prev, curr, idx ) => (
    `${idx === 0 ? curr.name : `${prev} &middot ${curr.name}`}`
  ), '' );

  const embedHTML = ( `<div id='CDPSyndication_${cryptoRandomVal}'>
    ${keepStyles ? embedStyles : ''}
    <h1>${embedItem.title}</h1>    
    <img class='cdp_thumbnail' src=${embedItem.thumbnail}>
    <p class='cdp_date'>Updated: ${moment( embedItem.modified ).format( 'MMMM DD, YYYY' )}</p>
    ${embedItem.content}
    <div class='cdp_metadata'>
      <p>Author: <a href='${embedItem.link}' target='_blank'>${embedItem.author}</a></p>
      <p>Date Published: ${moment( embedItem.published ).format( 'MMMM DD, YYYY' )}</p>
      <div class='tags'>${embedCategories}</div>
    </div>    
  </div>` );

  return (
    <div>
      <div className="tab_instructions">{ props.instructions }</div>
      <ClipboardCopy label="Embed Code" copyItem={ embedHTML } />
      { props.children }
    </div>
  );
};

EmbedCode.propTypes = {
  instructions: string,
  children: array,
  embedItem: object,
  keepStyles: bool
};

export default EmbedCode;
