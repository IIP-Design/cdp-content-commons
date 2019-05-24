import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getItemRequest } from '../../../utils/api';
import { normalizeItem } from '../../../utils/parser';
import { parseQueryString } from '../../../utils/browser';
import { setPageMetavalues } from '../../../utils/metaHeaders';
import Post from '../../Types/Post/Post';
import './ArticlePage.css';

class ArticlePage extends Component {
  state = {};

  componentDidMount() {
    const parsed = parseQueryString( this.props.location.search );
    this.loadPage( parsed );
  }

  redirectTo404() {
    this.props.history.replace( '/404' );
  }

  loadPage( parsed ) {
    if ( parsed && parsed.site && parsed.id ) {
      getItemRequest( parsed.site, parsed.id )
        .then( ( response ) => {
          if ( response.hits && response.hits.hits && response.hits.hits[0] ) {
            const item = normalizeItem( response.hits.hits[0] );
            this.setState( { item } );
            setPageMetavalues( item );
          } else {
            this.redirectTo404();
          }
        } )
        .catch( ( err ) => {
          // handle errors
        } );
    } else {
      this.redirectTo404();
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
        <Post item={ this.state.item } />
      </section>
    );
  }
}

ArticlePage.propTypes = {
  location: object,
  history: object
};

export default withRouter( ArticlePage );
