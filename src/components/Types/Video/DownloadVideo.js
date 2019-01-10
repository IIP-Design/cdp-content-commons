import React, { Component } from 'react';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import { Item } from 'semantic-ui-react';
import { object, string, bool, func } from 'prop-types';
import withFileDownload from '../../../utils/withFileDownload';

class DownloadVideo extends Component {
  getSrt() {
    const arr = [];
    const unit = this.props.selectedLanguageUnit;
    if ( unit && unit.srt && unit.srt.srcUrl ) {
      arr.push( unit.srt.srcUrl );
    }

    return arr;
  }

  getSizeInfo = ( size ) => {
    if ( !size ) return null;
    return {
      label: `${size.width} x ${size.height}`,
      weight: this.formatBytes( size.filesize )
    };
  };

  getFnExt = ( url ) => {
    const extRe = /([0-9a-z]+)$/i;
    const exts = url.match( extRe );
    return exts[0];
  };

  formatBytes = ( bytes, decimals ) => {
    if ( bytes === 0 ) return;
    const k = 1024;
    const dm = decimals || 2;
    const sizes = [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB'
    ];
    const i = Math.floor( Math.log( bytes ) / Math.log( k ) );
    return `${parseFloat( ( bytes / ( k ** i ) ).toFixed( dm ) )}  ${sizes[i]}`;
  };

  sortByFilesize = ( a, b ) => {
    if ( a.size && a.size.filesize && b.size && b.size.filesize ) {
      return +a.size.filesize > +b.size.filesize;
    }
    return true;
  };

  renderFormItem( video, index ) {
    const { title, language } = this.props.selectedLanguageUnit;
    const { defaultTitle } = this.props;
    const size = this.getSizeInfo( video.size );
    // const fn = `${title.replace( /\s/g, '_' )}_${video.size.width}.${this.getFnExt( video.downloadUrl )}`;
    const videoQuality = `${video.video_quality && video.video_quality === 'broadcast' ? 'broadcast' : 'web'}`;
    const downloadIdentifier = `${videoQuality}_${size.weight}_${size.label}`.replace( /\s/g, '' );
    return (
      <div key={ `fs_${index}` } >
        <Item.Group className="download-item">
          <Item as="a" href={ this.props.downloadLink( video.downloadUrl, defaultTitle, language.locale, downloadIdentifier ) }>
            <Item.Image size="mini" src={ downloadIcon } className="download-icon" />
            <Item.Content>
              <Item.Header className="download-header">
              Download <span className="lightweight">{ `"${title || defaultTitle}"` }</span> for { `${videoQuality}` }
              </Item.Header>
              <Item.Meta> { `File size: ${size.weight}` } </Item.Meta>
              <Item.Meta> { `Dimensions: ${size.label}` }</Item.Meta>
              <span className="item_hover">{ `Download for ${videoQuality}` }</span>
            </Item.Content>
          </Item>
        </Item.Group>
        <Item.Extra style={ { color: '#cd2026' } }>{ this.props.error }</Item.Extra>
      </div>
    );
  }

  renderFormItems( unit, burnedInCaptions ) {
    // fetch all source videos with NO burned in captions and then sort by file size
    const videos = unit.source.filter( video => ( video.burnedInCaptions === 'true' ) === burnedInCaptions );
    const videosWithSizeProp = unit.source.filter( video => video.size && video.size.filesize );

    // only sort the videos if each video has a filesize prop for comparison
    if ( videosWithSizeProp.length === videos.length ) {
      // filesize coming in as string, convert to number for comparision
      videos.sort( this.sortByFilesize );
    }

    // Filter for videos w/ downloadable URLs, then return array of react elements
    // returns empty array !downloadable URLs
    const videosArr = videos.filter( ( v, i ) => v.downloadUrl !== '' ).map( ( v, i ) => this.renderFormItem( v, i ) );
    return videosArr.length ? videosArr : 'There are no videos available for download at this time';
  }

  render() {
    const { selectedLanguageUnit, burnedInCaptions } = this.props;
    return (
      <div>
        <div className="form-group_instructions">{ this.props.instructions }</div>
        { this.props.selectedLanguageUnit && this.renderFormItems( selectedLanguageUnit, burnedInCaptions ) }
      </div>
    );
  }
}

DownloadVideo.propTypes = {
  selectedLanguageUnit: object,
  defaultTitle: string,
  instructions: string,
  burnedInCaptions: bool,
  downloadLink: func,
  error: string
};

export default withFileDownload( DownloadVideo );
