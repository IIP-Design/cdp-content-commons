/**
 *
 * ProjectSupportFiles
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectProjectSupportFiles from './selectors';

import sampleThumbSM from '../../../assets/images/Projects/madeinamerica_small.jpg';

import { Grid, Checkbox } from 'semantic-ui-react';

import './ProjectSupportFiles.css';

/* eslint-disable react/prefer-stateless-function */
class ProjectSupportFiles extends React.PureComponent {
  render() {
    return (
      <section className="section section--project_support-files project_support-files">
        <Grid stackable>
          <h3>SUPPORT FILES</h3>
          <Grid.Row>
            <Grid.Column mobile={ 16 } computer={ 5 }>
              <section className="files section">
                <p className="label">SRT files</p>
                <p className="file"><span className="label">Arabic:</span> madeinamerica_arabic.srt</p>
                <p className="file"><span className="label">Chinese:</span> madeinamerica_chinese.srt</p>
                <p className="file"><span className="label">English:</span> madeinamerica_english.srt</p>
                <p className="file"><span className="label">French:</span> madeinamerica_french.srt</p>
              </section>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 9 }>
              <Grid stackable>
                <Grid.Column mobile={ 16 } computer={ 8 }>
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
                <Grid.Column mobile={ 16 } computer={ 8 }>
                  <section className="addtl_files section">
                    <p className="label">Additional files</p>
                    <p><span className="label">English:</span> madeinamerica_english.mp3</p>
                  </section>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    );
  }
}

ProjectSupportFiles.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  projectsupportfiles: makeSelectProjectSupportFiles()
} );

export default connect( mapStateToProps, actions )( ProjectSupportFiles );
