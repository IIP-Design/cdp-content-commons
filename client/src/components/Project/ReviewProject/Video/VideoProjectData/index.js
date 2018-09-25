/**
 *
 * VideoProjectData
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import './VideoProjectData.css';

const VideoProjectData = ( props ) => {
  const { project_data } = props;
  const {
    video_title,
    author,
    owner,
    privacy_settings,
    categories,
    tags,
    public_description,
    internal_description
  } = project_data;

  return (
    <section className="section section--project_data">
      <Grid stackable>
        <h3>PROJECT DATA</h3>
        <Grid.Row>
          <Grid.Column mobile={ 16 } computer={ 5 }>
            <section className="project-data_meta section">
              <p><span className="label">Video Title:</span> { video_title }</p>
              <p><span className="label">Author:</span> { author }</p>
              <p><span className="label">Owner:</span> { owner }</p>
              <p><span className="label">Privacy Setting:</span> { privacy_settings }</p>
            </section>
            <section className="project-data_taxonomy section">              
              <p>
                <span className="label">Categories: </span>
                { categories.map( (cat, i, arr) => ( arr.length - 1 === i ? cat : `${cat}, ` ) ) }
              </p>
              <p>
                <span className="label">Tags: </span>
                { tags.map( (tag, i, arr) => ( arr.length - 1 === i ? tag : `${tag}, ` ) ) }
              </p>
            </section>
          </Grid.Column>
          <Grid.Column mobile={ 16 } computer={ 9 }>
            <section className="project-data_description section">
              <p><span className="label">Public Description:</span> { public_description }</p>
              <p><span className="label">Internal Description:</span> { internal_description }</p>
            </section>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>  
  );
}

VideoProjectData.propTypes = {
  project_data: PropTypes.object  
};

export default VideoProjectData;
