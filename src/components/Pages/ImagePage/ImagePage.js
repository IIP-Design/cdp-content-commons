import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getItemRequest } from '../../../utils/api';
import { normalizeItem } from '../../../utils/parser';
import { parseQueryString } from '../../../utils/browser';
import Image from '../../Types/Image/Image';
import './ImagePage.css';

class ImagePage extends Component {
  state = {};

  componentDidMount() {
    const parsed = parseQueryString( this.props.location.search );
    this.loadPage( parsed );
  }

  redirectTo404() {
    this.props.history.replace( '/404' );
  }

  loadPage( parsed ) {
    // Create temp item
    // const itemTemp = normalizeItem( {
    //   _id: 'abc123',
    //   _index: 'images_20180501',
    //   _score: 1.01,
    //   _type: 'image',
    //   _source: {
    //     post_id: 6613,
    //     site: 'commons.america.gov',
    //     type: 'image',
    //     subtype: 'poster',
    //     published: '2017-12-18T10:53:49+00:00',
    //     modified: '2018-01-03T13:38:57+00:00',
    //     owner: 'IIP Editorial Content',
    //     author: 'John Doe',
    //     protected: true,
    //     unit: [
    //       {
    //         language: {
    //           language_code: 'en',
    //           locale: 'en-US',
    //           text_direction: false,
    //           display_name: 'English',
    //           native_name: 'English',
    //           different_language: true
    //         },
    //         title: 'Preserve the Earth 2018: Protect Marine Species from Ocean Debris — Poster',
    //         desc: 'The 2018 Preserve the Earth poster to mark Earth Day on Sunday, April 22, 2018, is here! This beautiful poster, illustrated by artist Cathie Bleck, depicts marine wildlife put at risk by plastic debris in our oceans: dolphins, whales, birds, seals, crabs and tiny plankton among them.',
    //         internal_desc: 'Use this poster for awareness around environmental impact. Print the poster and hang it in your space, or share the web version digitally. This could include events, campaigns ... Do not use this poster for ....',
    //         categories: [
    //           {
    //             id: 'bLWWJ2MBCLPpGnLD2j9T',
    //             name: 'foreign aid'
    //           }
    //         ],
    //         tags: [
    //           'environment',
    //           'global issues'
    //         ],
    //         images: [
    //           {
    //             src: 'https://staticcdp.s3.amazonaws.com/2019/01/ylai.state.gov_4318/7d67e38872c0c1b67393b1e3589abc0b.jpg', // string
    //             md5: '1a79a4d60de6718e8e5b326e338ae533',
    //             filetype: 'jpg',
    //             size: {
    //               width: 640,
    //               height: 360,
    //               filesize: 197467
    //             },
    //             quality: 'web',
    //             use: 'infographic',
    //             editable: true
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }, 'en-us' );
    if ( parsed && parsed.site && parsed.id ) {
      getItemRequest( parsed.site, parsed.id )
        .then( ( response ) => {
          if ( response.hits && response.hits.hits && response.hits.hits[0] ) {
            const item = normalizeItem( response.hits.hits[0], parsed.language );
            this.setState( { item } );
          } else {
            this.redirectTo404();
          }
        } )
        .catch( ( err ) => {
          // handle errors
        } );
    } else {
      this.redirectTo404();
      // // SET TEMP ITEM DATA
      // this.setState( { item: itemTemp } );
    }
  }

  render() {
    if ( !this.state.item ) {
      return (
        <section className="image-page">
          <p className="image-page_paragraph">Content Unavailable</p>
        </section>
      );
    }
    return (
      <section className="image-page">
        <Image item={ this.state.item } />
      </section>
    );
  }
}

ImagePage.propTypes = {
  location: object,
  history: object
};

export default withRouter( ImagePage );
