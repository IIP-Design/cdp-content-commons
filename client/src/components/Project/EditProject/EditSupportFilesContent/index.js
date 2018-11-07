/**
 *
 * EditSupportFilesContent
 *
 */

import React from 'react';
import { string } from 'prop-types';
// import './EditSupportFilesContent.css';

const EditSupportFilesContent = ( props ) => {
  const { fileType } = props;

  /**
   * Duplicate props to avoid unknown prop warning
   * @see https://reactjs.org/warnings/unknown-prop.html
   */
  const articleProps = { ...props };
  delete articleProps.fileType;
  delete articleProps.modalTrigger;
  delete articleProps.modalContent;

  const headingStyle = {
    textTransform: ( fileType === 'srt' && 'uppercase' ) || 'capitalize'
  };

  return (
    <article className={ `${fileType}-files` } { ...articleProps }>
      <header className="header">
        <h2>Edit <span style={ headingStyle }>{ fileType }</span> files in this project</h2>
      </header>
      <p>Curabitur blandit tempus porttitor.</p>
    </article>
  );
};

EditSupportFilesContent.propTypes = {
  fileType: string
};

export default EditSupportFilesContent;
