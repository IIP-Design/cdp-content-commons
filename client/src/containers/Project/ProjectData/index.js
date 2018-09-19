/**
 *
 * ProjectData
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectProjectData from './selectors';

import { Grid } from 'semantic-ui-react';

import './ProjectData.css';

/* eslint-disable react/prefer-stateless-function */
class ProjectData extends React.PureComponent {
  render() {
    return (
      <section className="section section--project_data">
        <Grid stackable>
          <h3>PROJECT DATA</h3>
          <Grid.Row>
            <Grid.Column mobile={ 16 } computer={ 5 }>
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
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 9 }>
              <section className="project-data_description section">
                <p>
                  <span className="label">Public Description:</span> The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.
                </p>
                <p>
                  <span className="label">Internal Description:</span> Use this video on social media and embed on web pages to engage audiences in the importance of Economic Prosperity.
                </p>
              </section>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    );
  }
}

ProjectData.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  projectdata: makeSelectProjectData()
} );

export default connect( mapStateToProps, actions )( ProjectData );
