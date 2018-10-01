/**
 *
 * VideoConfirmDelete
 *
 */

import React from 'react';
import './VideoConfirmDelete.css';

/* eslint-disable react/prefer-stateless-function */
const VideoConfirmDelete = () => (
  <div className="delete_confirm delete_confirm--video">
    <h2>Are you sure you want to delete this video project?</h2>
    <p>This video project will be permanently removed from the Content Cloud. Any videos that you uploaded here will not be uploaded.</p>
  </div>
);

export default VideoConfirmDelete;
