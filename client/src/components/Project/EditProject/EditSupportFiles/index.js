/**
 *
 * EditSupportFiles
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';

import withModal from 'components/Project/EditProject/withModal';


const EditSupportFiles = ( props ) => {
  const { modalTrigger, modalContent, options } = props;
  return withModal( props, modalTrigger, modalContent, options );
};

EditSupportFiles.propTypes = {};

export default EditSupportFiles;
