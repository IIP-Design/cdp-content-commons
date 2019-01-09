import React, { Component } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';

const withFileDownload = ( WrappedComponent ) => {
  class HOC extends Component {
    constructor( props ) {
      super( props );
      this.ENDPOINT = `${process.env.REACT_APP_PUBLIC_API}/v1/task/download`;
      this.state = {
        error: ''
      };
    }

    download = ( url, title, locale, id = '' ) => {
      // Replace whitespace with dashes and remove non-alphanumerics
      title = title.replace( /\s+/g, '-' ).replace( /[^\w-]/g, '' );
      locale = locale.replace( '-', '_' );
      const ext = url.substr( url.lastIndexOf( '.' ) );
      id = ( id ) ? `.${id}` : '';
      const filename = `${title}.${locale}${id}${ext}`.toLowerCase();
      axios
        .post( this.ENDPOINT, { url, filename }, { responseType: 'blob' } )
        .then( ( response ) => {
          FileSaver.saveAs( response.data, filename );
        } )
        .catch( ( err ) => {
          this.setState( {
            error: `Oops there was a problem downloading your file: ${err.message}`
          } );
        } );
    };

    btoaNonLatin = ( str ) => {
      str = str.replace( /[^\x00-\x7F]/g, ( char ) => { // eslint-disable-line no-control-regex
        let hex = char.charCodeAt( 0 ).toString( 16 );
        while ( hex.length < 4 ) hex = `0${hex}`;
        return `\\u${hex}`;
      } );
      return btoa( str );
    };

    downloadLink = ( url, title, locale, id = '' ) => {
      // Replace whitespace with dashes and remove non-alphanumerics
      title = title.replace( /\s+/g, '-' ).replace( /[/\\:*?"<>|]/g, '' );
      locale = locale.replace( '-', '_' );
      const ext = url.substr( url.lastIndexOf( '.' ) );
      id = ( id ) ? `.${id}` : '';
      const filename = `${title}.${locale}${id}${ext}`.toLowerCase();
      const opts = {
        filename,
        url
      };
      return `${this.ENDPOINT}/${this.btoaNonLatin( JSON.stringify( opts ) )}`;
    };

    render() {
      return (
        <WrappedComponent
          { ...this.props }
          download={ this.download }
          downloadLink={ this.downloadLink }
          error={ this.state.error }
        />
      );
    }
  }

  return HOC;
};

export default withFileDownload;
