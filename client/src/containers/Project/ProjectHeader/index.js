/**
 *
 * ProjectHeader
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectProjectHeader from './selectors';

import { Grid, Button, Icon } from 'semantic-ui-react';

import './ProjectHeader.css';

/* eslint-disable react/prefer-stateless-function */
class ProjectHeader extends React.PureComponent {
  render() {
    const { text, icon } = this.props;

    return (
      <section className="section section--project_header">
        <Grid stackable divided="vertically">
          <Grid.Row>
            <Grid.Column className="project_header" mobile={ 16 } computer={ 8 }>
              <h2>
                <span className="project_header_icon"><Icon name={ icon } /></span>
                <span className="project_header_text">{ text }</span>
              </h2>
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
    );
  }
}

ProjectHeader.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  projectheader: makeSelectProjectHeader()
} );

export default connect( mapStateToProps, actions )( ProjectHeader );
