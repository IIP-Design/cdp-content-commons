/**
 *
 * ProjectItem
 *
 */

import React from 'react';
import { bool, func, object } from 'prop-types';
import './ProjectItem.css';

import withModal from 'components/Project/EditProject/withModal';

const ProjectItem = ( props ) => {
  const {
    data,
    isAvailable,
    displayItemInModal,
    modalTrigger,
    modalContent,
    customPlaceholderStyle
  } = props;

  const Item = modalTrigger;

  if ( !isAvailable ) {
    const defaultPlaceholderStyle = {
      flexBasis: '15em',
      marginRight: '1em',
      cursor: 'not-allowed',
      filter: 'blur(4px)'
    };
    const style = {
      ...defaultPlaceholderStyle,
      ...customPlaceholderStyle
    };

    return <Item { ...data } className="placeholder" style={ style } />;
  }

  return (
    ( displayItemInModal &&
      withModal( { triggerProps: { ...data } }, modalTrigger, modalContent ) ) ||
      <Item { ...data } />
  );
};

ProjectItem.propTypes = {
  data: object,
  isAvailable: bool,
  displayItemInModal: bool,
  modalTrigger: func,
  modalContent: func,
  customPlaceholderStyle: object
};

export default ProjectItem;
