/**
 *
 * PaneProjects
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectPaneProjects from './selectors';
import ProjectsTable from 'components/ProjectsTable';

import iconVideo from 'assets/icons/icon_32px_video.png';
import thumbnailVideo from 'assets/images/thumbnail_video.jpg';

import './PaneProjects.css';

// TEMP DATA (until database is connected)
const data = [
  {
    id: 1,
    checked: false,
    thumbnail: thumbnailVideo,
    icon: iconVideo,
    postType: 'video',
    title: 'Item 1',
    isNew: false,
    detailsLink: '',
    previewLink: '',
    visibility: 'draft',
    dateCreated: '2018-08-01',
    datePublished: '2018-09-01',
    dateLastModified: '2018-09-02',
    author: 'Jane Doe',
    owner: 'IIP Design',
    isFavorite: false
  },
  {
    id: 2,
    checked: false,
    thumbnail: thumbnailVideo,
    icon: iconVideo,
    postType: 'video',
    title: 'Item 2',
    isNew: false,
    detailsLink: '',
    previewLink: '',
    visibility: 'published',
    dateCreated: '2018-08-02',
    datePublished: '2018-09-02',
    dateLastModified: '2018-09-03',
    author: 'Joe Doe',
    owner: 'IIP Design',
    isFavorite: false
  },
  {
    id: 3,
    checked: false,
    thumbnail: thumbnailVideo,
    icon: iconVideo,
    postType: 'video',
    title: 'Item 3',
    isNew: false,
    detailsLink: '',
    previewLink: '',
    visibility: 'embargoed',
    dateCreated: '2018-08-03',
    datePublished: '2018-09-03',
    dateLastModified: '2018-09-04',
    author: 'Mister Name',
    owner: 'IIP Design',
    isFavorite: false
  }
];

/* eslint-disable react/prefer-stateless-function */
class PaneProjects extends React.PureComponent {
  render() {
    return (
      <section className="projects">
        <ProjectsTable data={ data } />
      </section>
    );
  }
}

PaneProjects.propTypes = {
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  paneprojects: makeSelectPaneProjects()
} );

export default connect( mapStateToProps, actions )( PaneProjects );
