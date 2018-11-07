/**
 *
 * ProjectItemsList
 *
 */

import React, { Fragment } from 'react';
import { array, bool, func, object, string } from 'prop-types';
// import './ProjectItemsList.css';

import ProjectItem from 'components/Project/ProjectItem';

const ProjectItemsList = ( props ) => {
  const {
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

  const defaultListStyle = {
    display: 'flex',
    paddingLeft: '0',
    listStyle: 'none'
  };

  const listStyle = { ...defaultListStyle, ...customListStyle };

  return (
    <Fragment>
      <h2 style={ { textTransform: 'uppercase' } }>{ headline }</h2>
      <ul className="project-items" style={ listStyle }>
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
      </ul>
    </Fragment>
  );
};

ProjectItemsList.propTypes = {
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

export default ProjectItemsList;
