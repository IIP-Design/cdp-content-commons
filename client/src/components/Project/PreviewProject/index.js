/**
 *
 * PreviewProject
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';

import withModal from 'components/Project/EditProject/withModal';


const PreviewProject = ( props ) => {
  const { modalTrigger, modalContent } = props;
  return withModal( props, modalTrigger, modalContent );
};

PreviewProject.propTypes = {};

export default PreviewProject;
