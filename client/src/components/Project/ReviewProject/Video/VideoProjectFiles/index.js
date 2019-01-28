/**
 *
 * VideoProjectFiles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Button } from 'semantic-ui-react';
import './VideoProjectFiles.css';

const VideoProjectFiles = ( props ) => {
  const { videos } = props;

  return (
    <section className="section section--project_files project_files">
      <h3 className="project_files_headline">VIDEOS IN PROJECT</h3>
      { videos.map( video => (
      <div key={ video.title } className="project_file">
        <Grid>
          <Grid.Row
            className={
              video.text_direction && video.text_direction === 'rtl' ? 'project_file_header rtl' : 'project_file_header'
            }
          >
            <Grid.Column floated="left" mobile={ 8 }>
              <h3 className="title">{ video.title }</h3>
            </Grid.Column>
            <Grid.Column floated="right" mobile={ 8 } className="project_file_edit">
              <Button className="project_button project_button--edit">
                <Link to="#">Edit</Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="project_file_contents">
            <Grid.Column mobile={ 16 } tablet={ 8 } computer={ 8 } className="file_meta">
              <img src={ video.thumbnail } alt="Project File" />
              <p><span className="label">File Name:</span> { video.file_name }</p>
              <p><span className="label">Filesize:</span> { video.file_size }</p>
              <p><span className="label">Dimensions:</span> { video.dimensions }</p>
              <p><span className="label">Uploaded:</span> { video.uploaded }</p>
              <p><span className="label">Duration:</span> { video.duration }</p>
            </Grid.Column>
            <Grid.Column mobile={ 16 } tablet={ 8 } computer={ 8 } className="file_info">
              <p><span className="label">Language:</span> { video.language }</p>
              <p><span className="label">Subtitles & Captions:</span> { video.subtitles_captions }</p>
              <p><span className="label">Video Type:</span> { video.video_type }</p>
              <p><span className="label">Quality:</span> { video.quality }</p>
              <p
                className={
                  video.text_direction && video.text_direction === 'rtl' ? 'public_description rtl' : 'public_description'
                }
              >
                <span className="label">Public Description:</span>
                <span>{ video.public_description }</span>
              </p>
              { video.additional_keywords &&
                <p className="additional_keywords">
                  <span className="label">Additional Keywords: </span>
                  { video.additional_keywords.map( ( addtl_file, i, arr ) => (
                      arr.length - 1 === i ? addtl_file : `${addtl_file}, `
                    ) ) }
                </p>
              }              
              <p><span className="label">YouTube URL:</span> { video.youtube_url }</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      ) ) }
    </section>
  );
}

VideoProjectFiles.propTypes = {
  videos: PropTypes.array
};

export default VideoProjectFiles;
