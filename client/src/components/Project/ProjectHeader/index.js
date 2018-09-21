/**
 *
 * ProjectHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import './ProjectHeader.css';

const ProjectHeader = ( props ) => {
  const { text, icon } = props;

  return (
    <section className="section section--project_header">
      <Grid stackable divided="vertically">
        <Grid.Row>
          <Grid.Column className="project_header" mobile={ 16 } computer={ 8 }>
            <h2>
              { icon && <span className="project_header_icon"><Icon name={ icon } /></span> }
              <span className="project_header_text">{ text }</span>
            </h2>
          </Grid.Column>
          {/* Buttons */}
          <Grid.Column mobile={ 16 } computer={ 8 }>
            { props.children }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>
  );
}

ProjectHeader.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default ProjectHeader;
