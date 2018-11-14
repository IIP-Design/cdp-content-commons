/**
 *
 * PreviewProjectContent
 *
 */

import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Dropdown, Embed, Icon } from 'semantic-ui-react';

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

  formatDate = ( dateString, locale, options = {} ) => {
    const a = dateString.split( /[^0-9]/ );
    const d = new Date( a[0], a[1] - 1, a[2], a[3], a[4], a[5] );
    return d.toLocaleString( locale, options );
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
      language,
      youTubeUrl
    } = selectedItem;

    const locale = language.code;
    const dateOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };

    /**
     * Duplicate props to avoid unknown prop warning
     * @see https://reactjs.org/warnings/unknown-prop.html
     */
    const contentProps = { ...this.props };
    delete contentProps.isUploadFinished;
    delete contentProps.data;
    delete contentProps.modalTrigger;
    delete contentProps.modalContent;

    const previewMsgStyles = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      padding: '1em 1.5em',
      fontSize: '1em',
      backgroundColor: '#faab1a'
    };

    return (
      <Fragment>
        <Notification
          customStyles={ previewMsgStyles }
          msg={ `This is a preview of your ${projectType} project on Content Commons.` }
        />
        <article { ...contentProps } className="project-preview">
          <header className="project-preview__header">
            <h1 className={ textDirection }>{ title }</h1>
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
          </header>
          <div className="project-preview__content">
            <div className="preview">
              { /* @todo getYouTubeId may not be necessary depending
                on how the YouTube URL is stored in data */ }
              { youTubeUrl &&
                <Embed
                  id={ this.getYouTubeId( youTubeUrl ) }
                  placeholder={ thumbnail }
                  source="youtube"
                /> }
            </div>
            <div className="project-meta">
              <dl>
                <dt>File Type:</dt>
                <dd>{ projectType }</dd>
                <br />
                <dt>Updated:</dt>
                <dd>
                  { this.formatDate( updated, locale, dateOptions ) }
                </dd>
              </dl>
            </div>
            <p className={ `public-desc ${textDirection}` }>
              { publicDesc }
            </p>
          </div>
          <footer>
            <div className="project-meta">
              <dl>
                <dt>Source:</dt>
                <dd>{ owner }</dd>
                <br />
                <dt>Date Published:</dt>
                <dd>
                  { this.formatDate( uploaded, locale, dateOptions ) }
                </dd>
              </dl>
            </div>
          </footer>
        </article>
      </Fragment>
    );
  }
}

PreviewProjectContent.propTypes = {
  data: object.isRequired
};

export default PreviewProjectContent;
