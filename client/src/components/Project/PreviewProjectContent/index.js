/**
 *
 * PreviewProjectContent
 *
 */

import React from 'react';
import { object } from 'prop-types';
import { Dropdown, Embed, Icon } from 'semantic-ui-react';

import ModalItem from 'components/Modals/ModalItem/ModalItem';
import ModalContentMeta from 'components/Modals/ModalContentMeta/ModalContentMeta';
import ModalDescription from 'components/Modals/ModalDescription/ModalDescription';
import ModalPostMeta from 'components/Modals/ModalPostMeta/ModalPostMeta';
import Notification from 'components/Project/Notification/Loadable';
import './PreviewProjectContent.css';


/* eslint-disable react/prefer-stateless-function */
class PreviewProjectContent extends React.PureComponent {
  constructor( { data, projecttype } ) {
    super();

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
      key: item.language.code,
      value: item.language.display,
      text: item.language.display
    } ) )
  );

  getProjectItems = ( obj, str ) => (
    obj[str].reduce( ( acc, item ) => ( {
      ...acc,
      [item.language.display]: item
    } ), {} )
  );

  getYouTubeId = ( url ) => {
    /**
     * @todo This may not even be necessary depending
     * on how the YouTube URL/Id is stored in data.
     */
    url = url
      .replace( /(>|<)/gi, '' )
      .split( /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/ );

    return url[2] ? url[2].split( /[^0-9a-z_-]/i )[0] : url;
  };

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
      updated
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
      textDirection,
      publicDesc,
      uploaded,
      youTubeUrl
    } = selectedItem;

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
        textDirection={ textDirection }
      >
        <Notification
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
          { /* @todo need to replace download icon later */ }
          <Icon name="download" />
        </div>

        <div className="project-preview__content">
          { /* @todo getYouTubeId may not be necessary depending
            on how the YouTube URL is stored in data */ }
          { youTubeUrl &&
            <Embed
              id={ this.getYouTubeId( youTubeUrl ) }
              placeholder={ thumbnail }
              source="youtube"
            /> }

          <ModalContentMeta type={ projectType } dateUpdated={ updated } />

          <ModalDescription description={ publicDesc } />
        </div>

        <ModalPostMeta source={ owner } datePublished={ uploaded } />
      </ModalItem>
    );
  }
}

PreviewProjectContent.propTypes = {
  data: object.isRequired
};

export default PreviewProjectContent;
