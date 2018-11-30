/**
 *
 * PreviewProjectContent
 *
 */

import React from 'react';
import { object, string } from 'prop-types';
import { Dropdown, Embed } from 'semantic-ui-react';

import downloadIcon from '../../../assets/icons/icon_download.svg';

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import ModalContentMeta from 'components/Modals/ModalContentMeta/ModalContentMeta';
import ModalDescription from 'components/Modals/ModalDescription/ModalDescription';
import ModalPostMeta from 'components/Modals/ModalPostMeta/ModalPostMeta';

import PopupTrigger from 'components/Popup/PopupTrigger';
import PopupTabbed from 'components/Popup/PopupTabbed';

import DownloadVideo from 'components/Types/Video/DownloadVideo';
import DownloadSrt from 'components/Types/Video/DownloadSrt';
import DownloadThumbnail from 'components/Types/Video/DownloadThumbnail';
import DownloadOtherFiles from 'components/Types/Video/DownloadOtherFiles';
import DownloadHelp from 'components/Types/Video/DownloadHelp';

import Notification from 'components/Project/Notification/Loadable';

import { getYouTubeId } from '../../../utils/helpers';
import './PreviewProjectContent.css';


/* eslint-disable react/prefer-stateless-function */
class PreviewProjectContent extends React.PureComponent {
  constructor( props ) {
    super( props );
    const { data, projecttype } = this.props;

    this.state = {
      dropDownIsOpen: false,
      selectedLanguage: 'English',
      projectItems: this.getProjectItems( data, projecttype ),
      selectedItem: {},
      languages: this.getLanguages( data, projecttype )
    };
  }

  componentWillMount = () => {
    this.selectProjectItem();
  }

  getLanguages = ( obj, str ) => (
    obj[str].map( item => ( {
      key: item.language.language_code,
      value: item.language.display_name,
      text: item.language.display_name
    } ) )
  );

  getProjectItems = ( obj, str ) => (
    obj[str].reduce( ( acc, item ) => ( {
      ...acc,
      [item.language.display_name]: item
    } ), {} )
  );

  toggleArrow = () => {
    this.setState( { dropDownIsOpen: !this.state.dropDownIsOpen } );
  }

  selectLanguage = ( language ) => {
    this.setState( { selectedLanguage: language } );
  }

  selectProjectItem = () => {
    this.setState( nextState => ( {
      selectedItem: nextState.projectItems[nextState.selectedLanguage]
    } ) );
  }

  handleChange = ( e, { value } ) => {
    this.toggleArrow();
    this.selectLanguage( value );
    this.selectProjectItem();
  }

  render() {
    const {
      projectType,
      projectData,
      updated,
      videos
    } = this.props.data;
    const { owner } = projectData;

    const {
      dropDownIsOpen,
      selectedLanguage,
      selectedItem,
      languages
    } = this.state;

    const {
      title,
      thumbnail,
      language,
      desc,
      uploaded,
      source
    } = selectedItem;

    const youTubeUrl = source[0].streamUrl[0].url;
    const { burnedInCaptions } = source[0];

    const previewMsgStyles = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      // match Semantic UI border-radius
      borderTopLeftRadius: '0.28571429rem',
      borderTopRightRadius: '0.28571429rem',
      padding: '1em 1.5em',
      fontSize: '1em',
      backgroundColor: '#faab1a'
    };

    return (
      <ModalItem
        customClassName="project-preview"
        headline={ title }
        textDirection={ language.text_direction }
      >
        <Notification
          el="p"
          customStyles={ previewMsgStyles }
          msg={ `This is a preview of your ${projectType} project on Content Commons.` }
        />

        <div className="modal_options">
          <Dropdown
            className="modal_languages"
            value={ selectedLanguage }
            icon={ dropDownIsOpen ? 'chevron up' : 'chevron down' }
            options={ languages }
            onClick={ this.toggleArrow }
            onChange={ this.handleChange }
          />

          <div className="trigger-container">
            <PopupTrigger
              toolTip="Download video"
              icon={ { img: downloadIcon, dim: 18 } }
              position="right"
              show={ projectType === 'video' }
              content={
                <PopupTabbed
                  title="Download this video."
                  panes={ [
                    {
                      title: 'Video File',
                      component: (
                        <DownloadVideo
                          selectedLanguageUnit={ selectedItem }
                          instructions={ `Download the video and SRT files in ${selectedLanguage}.
                            This download option is best for uploading this video to web pages.` }
                          burnedInCaptions={ burnedInCaptions === 'true' }
                        />
                      )
                    },
                    {
                      title: 'SRT',
                      component: (
                        <DownloadSrt
                          instructions="Download SRTs"
                          units={ videos }
                        />
                      )
                    },
                    {
                      title: 'Thumbnail',
                      component: (
                        <DownloadThumbnail
                          instructions="Download Thumbnail(s)"
                          units={ videos }
                        />
                      )
                    },
                    {
                      title: 'Other',
                      component: (
                        <DownloadOtherFiles
                          instructions="Download Other File(s)"
                          units={ videos }
                        />
                      )
                    },
                    { title: 'Help', component: <DownloadHelp /> }
                  ] }
                />
              }
            />
          </div>
        </div>

        <div className="project-preview__content">
          { /* @todo getYouTubeId may not be necessary depending
            on how the YouTube URL is stored in data */ }
          { youTubeUrl &&
            <Embed
              id={ getYouTubeId( youTubeUrl ) }
              placeholder={ thumbnail }
              source="youtube"
            /> }

          <ModalContentMeta type={ projectType } dateUpdated={ updated } />

          <ModalDescription description={ desc } />
        </div>

        <ModalPostMeta source={ owner } datePublished={ uploaded } />
      </ModalItem>
    );
  }
}

PreviewProjectContent.propTypes = {
  data: object.isRequired,
  projecttype: string
};

export default PreviewProjectContent;
