import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getItemRequest } from 'utils/api';
import { normalizeItem } from 'utils/parser';
import { parseQueryString } from 'utils/browser';
import Video from 'components/Types/Video/Video';
import './VideoPage.css';

class VideoPage extends Component {
  state = {};

  componentDidMount() {
    const parsed = parseQueryString( this.props.location.search );
    this.loadPage( parsed );
  }

  loadPage( parsed ) {
    if ( parsed && parsed.site && parsed.id ) {
      getItemRequest( parsed.site, parsed.id )
        .then( ( response ) => {
          if ( response.hits && response.hits.hits && response.hits.hits[0] ) {
            const item = normalizeItem( response.hits.hits[0], parsed.language );
            this.setState( { item } );
          }
        } )
        .catch( ( err ) => {
          // handle errors
        } );
    }
  }

  render() {
    if ( !this.state.item ) {
      return (
        <section className="video-page">
          <p className="video-page_paragraph">Content Unavailable</p>
        </section>
      );
    }

    return (
      <section className="video-page">
        <Video item={ this.state.item } />
      </section>
    );
  }
}

VideoPage.propTypes = {
  location: object
};

export default withRouter( VideoPage );
