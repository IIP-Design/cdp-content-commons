/**
 *
 * EditSupportFiles
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';

import withModal from 'components/Project/EditProject/withModal';


const EditSupportFiles = ( props ) => {
  const { modalTrigger, modalContent } = props;
  return withModal( props, modalTrigger, modalContent );
};

EditSupportFiles.propTypes = {};

export default EditSupportFiles;
