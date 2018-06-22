import React, { Component } from 'react';
import { object } from 'prop-types';
import { Embed, Checkbox } from 'semantic-ui-react';

// import plusIcon from '../../../assets/icons/icon_plus.svg';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import shareIcon from '../../../assets/icons/icon_share.svg';

import ModalItem from '../../Modals/ModalItem';
import ModalLangDropdown from '../../Modals/ModalLangDropdown/ModalLangDropdown';
import ModalContentMeta from '../../Modals/ModalContentMeta/ModalContentMeta';
import ModalDescription from '../../Modals/ModalDescription/ModalDescription';
import ModalPostMeta from '../../Modals/ModalPostMeta/ModalPostMeta';
import ModalPostTags from '../../Modals/ModalPostTags/ModalPostTags';

import PopupTrigger from '../../Popup/PopupTrigger';
import PopupTabbed from '../../Popup/PopupTabbed';

import DownloadVideo from './DownloadVideo';
import DownloadSrt from './DownloadSrt';
import DownloadTranscript from './DownloadTranscript';
import DownloadHelp from './DownloadHelp';

import Share from '../Share';

class VideoModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      unit: this.props.item.selectedLanguageUnit,
      selectedLanguage: this.getLanguage(),
      captions: this.getCaptions(),
      textDirection: this.getTextDirection()
    };

    this.handleLanguageChange = this.handleLanguageChange.bind( this );
    this.handleCaptionChange = this.handleCaptionChange.bind( this );
  }

  getVideoSource() {
    const { unit, captions } = this.state;
    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );
      if ( source && source.stream && source.stream.url ) {
        return source.stream.uid;
      }
    }
    return null;
  }

  // NOTE: Chrome is throwing an error when youtube is embedded:
  // https://stackoverflow.com/questions/48714879/error-parsing-header-x-xss-protection-google-chrome
  getYouTubeId() {
    const { unit, captions } = this.state;
    let id = null;

    if ( unit && Array.isArray( unit.source ) ) {
      const source = unit.source.find( caption => ( caption.burnedInCaptions === 'true' ) === captions );

      if ( source && source.streamUrl ) {
        const streamObj = source.streamUrl.find( stream => stream.site === 'youtube' );

        if ( streamObj && streamObj.url ) {
          const youtubeUrl = streamObj.url;

          const reShort = /https:\/\/youtu.be\/(.*)/;
          const reLong = /https:\/\/www.youtube.com\/watch\?v=(.*)/;

          id = youtubeUrl.match( reShort );
          if ( id && id[1] ) {
            return id[1];
          }

          id = youtubeUrl.match( reLong );
          if ( id && id[1] ) {
            return id[1];
          }
        }
      }
    }

    return id;
  }

  getVideoTranscript() {
    const { unit } = this.state;
    if ( unit ) {
      if ( unit.transcript && unit.transcript.text ) {
        return unit.transcript.text;
      }
    } else {
      return '';
    }
  }

  getLanguage() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return 'English';
    return selectedLanguageUnit.language.display_name;
  }

  // Note: The burnedInCaptions porperty is coming in as 'true' and 'false' strings. Need to coerce
  //  in spots to ensure valid comparison.  Going forweard, try to avoid 'true' and 'false' strings
  getCaptions() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return false;
    const { source } = selectedLanguageUnit;
    if ( !source ) return false;
    if ( !source[0] ) return false;

    return source[0].burnedInCaptions === 'true'; // coerce to a boolean
  }

  getTextDirection() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return 'ltr';
    return selectedLanguageUnit.language.text_direction;
  }

  getShareLink() {
    let shareLinkURL = null;
    const youTubeId = this.getYouTubeId();

    try {
      if ( youTubeId ) {
        shareLinkURL = `https://youtu.be/${youTubeId}`;
      } else {
        const uid = this.getVideoSource();
        shareLinkURL = `https://iframe.cloudflarestream.com/${uid}`;
      }

      if ( shareLinkURL === null || shareLinkURL === undefined ) throw new Error( 'Missing Share Video Link' );
    } catch ( e ) {
      console.error( `${e.name}: ${e.message}` );
    }

    return shareLinkURL;
  }

  handleLanguageChange( value ) {
    if ( value ) {
      const unit = this.props.item.units.find( lang => lang.language.display_name === value );
      if ( unit ) {
        this.setState( {
          unit,
          selectedLanguage: value,
          captions: unit.source[0] ? unit.source[0].burnedInCaptions === 'true' : false,
          textDirection: unit.language.text_direction
        } );
      }
    }
  }

  handleCaptionChange() {
    this.setState( { captions: !this.state.captions } );
  }

  renderVideoPlayer() {
    // render youtube player if link available
    const youTubeId = this.getYouTubeId();
    if ( youTubeId ) {
      return <Embed id={ youTubeId } placeholder={ this.props.item.thumbnail } source="youtube" />;
    }

    // fallback to CloudFlare player if no youtube link available
    const uid = this.getVideoSource();
    const active = !!uid;
    const icon = active ? 'video play' : 'warning circle';

    return (
      <Embed
        active={ active }
        icon={ icon }
        placeholder={ this.props.item.thumbnail }
        url={ `https://iframe.cloudflarestream.com/${uid}` }
      />
    );
  }

  renderCaptionTabTitle() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) {
      return 'With Subtitles';
    }
    const source = selectedLanguageUnit.source.find( src => src.burnedInCaptions === 'no' );
    return source ? 'With Captions' : 'With Subtitles';
  }

  render() {
    const { unit, textDirection } = this.state;
    const {
      type, logo, author, owner, published, modified
    } = this.props.item;

    if ( unit ) {
      return (
        <ModalItem headline={ unit.title } textDirection={ textDirection }>
          <div className="modal_options">
            <div className="modal_options_left">
              <ModalLangDropdown
                item={ this.props.item }
                selected={ this.state.selectedLanguage }
                handleLanguageChange={ this.handleLanguageChange }
              />
              { unit.source.length > 1 && (
                <Checkbox
                  className="modal_captions"
                  checked={ this.state.captions }
                  toggle
                  label="Video with captions"
                  onChange={ this.handleCaptionChange }
                />
              ) }
            </div>
            <div className="modal_options_share">
              <PopupTrigger
                toolTip=""
                icon="plus circle"
                // show={ item.type === 'video' }
                show={ false }
                content={ <div /> }
              />
              <PopupTrigger
                toolTip="Share this video"
                icon={ shareIcon }
                show
                content={
                  <PopupTabbed
                    classes="popup_share"
                    title="SHARE"
                    noTabsMenu
                    panes={
                      [
                        {
                          title: '',
                          component: <Share contentTitle={ unit.title } shareLink={ this.getShareLink() } />
                        }
                      ]
                    }
                  />
                }
              />
              <PopupTrigger
                toolTip="Download video"
                icon={ downloadIcon }
                position="right"
                show={ type === 'video' }
                content={
                  <PopupTabbed
                    title="Download this video."
                    panes={ [
                      {
                        title: 'Video File',
                        component: (
                          <DownloadVideo
                            selectedLanguageUnit={ unit }
                            instructions={ `Download the video and SRT files in ${unit.language.display_name}.
                              This download option is best for uploading this video to web pages.` }
                            burnedInCaptions={ this.state.captions }
                          />
                        )
                      },
                      {
                        title: 'SRT',
                        component: (
                          <DownloadSrt
                            selectedLanguageUnit={ unit }
                            instructions="Download SRTs"
                            units={ this.props.item.units }
                          />
                        )
                      },
                      {
                        title: 'Transcript',
                        component: (
                          <DownloadTranscript units={ this.props.item.units } instructions="Download Transcripts" />
                        )
                      },
                      { title: 'Help', component: <DownloadHelp /> }
                    ] }
                  />
                }
              />
            </div>
          </div>

          { this.renderVideoPlayer() }

          <ModalContentMeta type={ type } dateUpdated={ modified } transcript={ this.getVideoTranscript() } />
          <ModalDescription description={ unit.desc } />
          <ModalPostMeta author={ author } logo={ logo } source={ owner } datePublished={ published } />
          <ModalPostTags tags={ unit.categories } />
        </ModalItem>
      );
    }
    return <ModalItem headline="Content Unavailable" />;
  }
}

VideoModal.propTypes = {
  item: object
};

export default VideoModal;
