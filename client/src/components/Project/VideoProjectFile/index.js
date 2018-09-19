/**
 *
 * VideoProjectFile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import sampleThumbMD from '../../../assets/images/Projects/madeinamerica_med.jpg';
import { Grid, Button } from 'semantic-ui-react';
import './VideoProjectFile.css';

const VideoProjectFile = ( props ) => {
  return (
    <div className="project_file">
      <Grid>
        <Grid.Row className="project_file_header">
          <Grid.Column floated="left" mobile={ 8 }>
            <h3 className="title">Made in America</h3>
          </Grid.Column>
          <Grid.Column floated="right" mobile={ 8 } className="project_file_edit">
            <Button>Edit</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="project_file_contents">
          <Grid.Column mobile={ 16 } tablet={ 8 } computer={ 8 } className="file_meta">
            <img src={ sampleThumbMD } alt="Project File" />
            <p><span className="label">File Name:</span> madeinamerica_english.mp4</p>
            <p><span className="label">Filesize:</span> 631.9MB</p>
            <p><span className="label">Dimensions:</span> 1920 x 1080</p>
            <p><span className="label">Uploaded:</span> April 13, 2018 at 3:45 PM</p>
            <p><span className="label">Duration:</span> 9:16</p>
          </Grid.Column>
          <Grid.Column mobile={ 16 } tablet={ 8 } computer={ 8 } className="file_info">
            <p><span className="label">Language:</span> English</p>
            <p><span className="label">Subtitles & Captions:</span> Clean – No Captions</p>
            <p><span className="label">Video Type:</span> Full Video</p>
            <p><span className="label">Quality:</span> For web</p>
            <p className="public_description"><span className="label">Public Description:</span> The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.</p>
            <p><span className="label">YouTube URL:</span> youtube.com/videourl</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

VideoProjectFile.propTypes = {};

export default VideoProjectFile;
