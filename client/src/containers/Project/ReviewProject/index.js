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
import { Grid, Button } from 'semantic-ui-react';
import './ReviewProject.css';

const ReviewProject = ( props ) => {
  return (
    <Page title="Review Project" description="Review content project">
      <Breadcrumbs />

      <div className="review-project">
        <section className="review-project_header section">
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

        <section className="review-project_project-data section">
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <section className="review-project_project-files section">
          <Grid stackable divided="vertically">
            <Grid.Row>
              <Grid.Column>
                <h3>VIDEOS IN PROJECT</h3>                
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
