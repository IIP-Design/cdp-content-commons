/**
 *
 * ReviewProject
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectReviewProject from './selectors';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Grid, Button, Checkbox } from 'semantic-ui-react';
import sampleThumbSM from '../../../assets/images/Projects/madeinamerica_small.jpg';
import sampleThumbMD from '../../../assets/images/Projects/madeinamerica_med.jpg';
import './ReviewProject.css';

const ReviewProject = ( props ) => {
  return (
    <Page title="Review Project" description="Review content project">
      <Breadcrumbs />
      <div className="review-project">

        <section className="section section--project_header">
          <Grid stackable divided="vertically">
            <Grid.Row>
              <Grid.Column mobile={ 16 } computer={ 8 }>
                <h2>Review Video Project</h2>
              </Grid.Column>
              <Grid.Column mobile={ 16 } computer={ 8 }>
                <Button>Delete Project</Button>
                <Button>Edit</Button>
                <Button>Preview Project</Button>
                <Button>Publish</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <section className="section section--project_data">
          <Grid stackable divided>
            <Grid.Row>
              <Grid.Column className="project-data_info" mobile={ 16 } computer={ 10 }>
                <h3>PROJECT DATA</h3>
                <section className="project-data_meta section">
                  <p><span className="label">Video Title:</span> Made in America</p>
                  <p><span className="label">Author:</span> Jane Doe</p>
                  <p><span className="label">Owner:</span> IIP Video Production</p>
                  <p><span className="label">Privacy Setting:</span> Anyone can see this project</p>
                </section>
                <section className="project-data_taxonomy section">
                  <p><span className="label">Categories:</span> Science & Technology</p>
                  <p><span className="label">Tags:</span> economy, manufacturing</p>
                </section>
                <section className="project-data_description section">
                  <p>
                    <span className="label">Public Description:</span> The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.
                  </p>
                  <p>
                    <span className="label">Internal Description:</span> Use this video on social media and embed on web pages to engage audiences in the importance of Economic Prosperity.
                  </p>
                </section>
              </Grid.Column>
              <Grid.Column className="project-data_support-files" mobile={ 16 } computer={ 6 }>
                <h3>SUPPORT FILES</h3>
                <section className="files section">
                  <p className="label">SRT files</p>
                  <p className="file"><span className="label">Arabic:</span> madeinamerica_arabic.srt</p>
                  <p className="file"><span className="label">Chinese:</span> madeinamerica_chinese.srt</p>
                  <p className="file"><span className="label">English:</span> madeinamerica_english.srt</p>
                  <p className="file"><span className="label">French:</span> madeinamerica_french.srt</p>
                </section>
                <section className="thumbnails section">
                  <p className="label">Thumbnail files</p>
                  <Grid columns='three'>
                    <Grid.Column>
                      <img className="thumbnails_img" src={ sampleThumbSM } alt="Project Thumbnail Small" />
                      <p>Arabic</p>
                    </Grid.Column>
                    <Grid.Column>
                      <img className="thumbnails_img" src={ sampleThumbSM } alt="Project Thumbnail Small" />
                      <p>Chinese</p>
                    </Grid.Column>
                    <Grid.Column>
                      <img className="thumbnails_img" src={ sampleThumbSM } alt="Project Thumbnail Small" />
                      <p>English</p>
                    </Grid.Column>
                    <Grid.Column>
                      <img className="thumbnails_img" src={ sampleThumbSM } alt="Project Thumbnail Small" />
                      <p>French</p>
                    </Grid.Column>
                  </Grid>
                  <Checkbox label="Disable right-click to protect your images" />
                </section>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <section className="section section--project_files project_files">
          <h3 className="project_files_headline">VIDEOS IN PROJECT</h3>
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
        </section>

      </div>
    </Page>
  );
}

ReviewProject.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  reviewproject: makeSelectReviewProject()
} );

export default connect( mapStateToProps, actions )( ReviewProject );
