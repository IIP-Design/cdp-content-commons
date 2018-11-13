/**
 *
 * ProjectItem
 *
 */

import React from 'react';
import { bool, func, object } from 'prop-types';
import './ProjectItem.css';

import withModal from 'components/Project/EditProject/withModal';
import Placeholder from 'components/Project/Placeholder';

const ProjectItem = ( props ) => {
  const {
    data,
    isAvailable,
    displayItemInModal,
    modalTrigger,
    modalContent
  } = props;

  const Item = modalTrigger;
  const sharedStyles = { cursor: 'not-allowed' };

  if ( isAvailable ) {
    return (
      ( displayItemInModal &&
        withModal( { triggerProps: { ...data } }, modalTrigger, modalContent ) ) ||
        <Item { ...data } />
    );
  }

  return (
    <Placeholder
      parentEl="li"
      childEl="div"
      childStyles={ {
        thumbnail: {
          ...sharedStyles,
          height: '8em'
        },
        heading: {
          ...sharedStyles,
          height: '1.3em',
          width: '80%'
        },
        language: {
          ...sharedStyles,
          width: '60%'
        }
      } }
    />
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
