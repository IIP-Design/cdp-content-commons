/**
 *
 * ProjectItem
 *
 */

import React from 'react';
import { bool, func, object, string } from 'prop-types';
import './ProjectItem.css';

import withModal from 'components/Project/EditProject/withModal';
import Placeholder from 'components/Project/Placeholder';

const ProjectItem = ( props ) => {
  const {
    projectId,
    itemId,
    isAvailable,
    displayItemInModal,
    modalProps,
    modalTrigger,
    modalContent
  } = props;

  const Item = modalTrigger;
  const combinedProps = {
    triggerProps: {
      ...projectId,
      itemId,
      displayItemInModal
    },
    contentProps: {
      ...modalProps
    }
  };
  const sharedStyles = { cursor: 'not-allowed' };

  if ( isAvailable ) {
    return (
      ( displayItemInModal &&
        withModal( combinedProps, modalTrigger, modalContent ) ) ||
        <Item
          { ...projectId }
          itemId={ itemId }
          displayItemInModal={ displayItemInModal }
        />
    );
  }

  return (
    <Placeholder
      parentEl="li"
      childEl="div"
      parentStyles={ { marginBottom: '1.5em' } }
      childStyles={ {
        thumbnail: {
          ...sharedStyles,
          height: '10em'
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
  projectId: object.isRequired,
  itemId: string.isRequired,
  isAvailable: bool,
  displayItemInModal: bool,
  modalProps: object,
  modalTrigger: func,
  modalContent: func,
  customPlaceholderStyle: object
};

export default ProjectItem;
