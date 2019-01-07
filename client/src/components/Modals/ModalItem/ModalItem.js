import React from 'react';
import { node, string } from 'prop-types';
import './ModalItem.css';
import './ModalItemRTL.css';

const ModalItem = ( props ) => {
  const {
    headline,
    textDirection,
    customClassName
  } = props;

  return (
    <div className={ `modal ${customClassName} ${textDirection}` }>
      <h1 className="modal_headline">{ headline }</h1>
      { props.children }
    </div>
  );
};

ModalItem.propTypes = {
  headline: string,
  children: node,
  textDirection: string,
  customClassName: string
};

export default ModalItem;
