/**
 *
 * PreviewProject
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';

import withModal from 'components/Project/EditProject/withModal';


const PreviewProject = ( props ) => {
  const { modalTrigger, modalContent, options } = props;
  return withModal( props, modalTrigger, modalContent, options );
};

PreviewProject.propTypes = {};

export default PreviewProject;
