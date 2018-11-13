/**
 *
 * ProjectItemsList
 *
 */

import React from 'react';
import { array, bool, func, object, string } from 'prop-types';
import './ProjectItemsList.css';

import ProjectItem from 'components/Project/ProjectItem';

const ProjectItemsList = ( props ) => {
  const {
    listEl,
    data,
    headline,
    hasSubmittedData,
    projectType,
    displayItemInModal,
    modalTrigger,
    modalContent,
    customListStyle,
    customPlaceholderStyle
  } = props;

  const List = listEl;

  const defaultListStyle = {
    display: 'flex',
    paddingLeft: '0',
    listStyle: 'none'
  };

  const listStyle = { ...defaultListStyle, ...customListStyle };

  return (
    <div className="project-items">
      <h2 className="list-heading">{ headline }</h2>
      <List className="items-list" style={ listStyle }>
        { data.map( item => (
          <ProjectItem
            key={ `${item.title} - ${item.language}` }
            isAvailable={ hasSubmittedData }
            type={ projectType }
            displayItemInModal={ displayItemInModal }
            data={ { ...item } }
            modalTrigger={ modalTrigger }
            modalContent={ modalContent }
            customPlaceholderStyle={ customPlaceholderStyle }
          />
        ) ) }
      </List>
    </div>
  );
};

ProjectItemsList.propTypes = {
  listEl: string,
  data: array.isRequired,
  headline: string,
  hasSubmittedData: bool,
  projectType: string.isRequired,
  displayItemInModal: bool,
  modalTrigger: func,
  modalContent: func,
  customListStyle: object,
  customPlaceholderStyle: object
};

ProjectItemsList.defaultProps = {
  listEl: 'ul'
};

export default ProjectItemsList;
