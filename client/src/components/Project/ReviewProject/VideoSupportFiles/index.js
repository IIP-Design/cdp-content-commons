/**
 *
 * VideoSupportFiles
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Checkbox } from 'semantic-ui-react';
import './VideoSupportFiles.css';

/* eslint-disable react/prefer-stateless-function */
class VideoSupportFiles extends React.Component {
  render() {
    const {
      support_files,
      disableRightClick,
      toggleDisableRightClick
    } = this.props;

    const {
      srt_files,
      thumbnail_files,
      additional_files
    } = support_files;

    return (
      <section className="section section--project_support-files project_support-files">
        <Grid stackable>
          <h3>SUPPORT FILES</h3>
          <Grid.Row>
            <Grid.Column mobile={ 16 } computer={ 5 }>
              <section className="files section">
                <p className="label">SRT files</p>
                {
                  srt_files.map( ( srt ) => (
                    <p key={ srt.lang } className="file"><span className="label">{ srt.lang }:</span> { srt.file }</p>
                  ) )
                }
              </section>
            </Grid.Column>
            <Grid.Column mobile={ 16 } computer={ 9 }>
              <Grid stackable>
                <Grid.Column mobile={ 16 } computer={ 8 }>
                  <section className="thumbnails section">
                    <p className="label">Thumbnail files</p>
                    <Grid columns='three'>
                      {
                        thumbnail_files.map( file => (
                          <Grid.Column key={ file.lang }>
                            <img className="thumbnails_img" src={ file.file } alt="Project Thumbnail Small" />
                            <p>{ file.lang }</p>
                          </Grid.Column>    
                        ) )
                      }
                    </Grid>
                    
                    <Checkbox
                      label="Disable right-click to protect your images"
                      checked={ disableRightClick }
                      onClick={ toggleDisableRightClick }
                    />

                  </section>
                </Grid.Column>
                <Grid.Column mobile={ 16 } computer={ 8 }>
                  <section className="addtl_files section">
                    <p className="label">Additional files</p>
                    {
                      additional_files.map( addtl_file => (
                        <p key={ addtl_file.lang }><span className="label">{ addtl_file.lang }:</span> { addtl_file.file }</p>
                      ) )
                    }
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

VideoSupportFiles.propTypes = {
  support_files: PropTypes.object,
  disableRightClick: PropTypes.bool,
  toggleDisableRightClick: PropTypes.func
};

export default VideoSupportFiles;
