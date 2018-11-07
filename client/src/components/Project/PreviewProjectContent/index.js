/**
 *
 * PreviewProjectContent
 *
 */

import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

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
      value: item.language,
      text: item.language
    } ) )
  );

  getProjectItems = ( obj, str ) => (
    obj[str].reduce( ( acc, item ) => ( {
      ...acc,
      [item.language]: item
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
      alt,
      textDirection,
      publicDesc,
      uploaded
    } = selectedItem;

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
              { /* need to replace download icon later */ }
              <Icon name="download" />
            </div>
          </header>
          <div className="project-preview__content">
            <div className="preview">
              { /* replace with when data structure is known */ }
              <img
                src={ thumbnail }
                alt={ alt }
                className="thumbnail"
              />
              <Icon
                name="video play"
                size="huge"
                inverted
                className="play-video-icon"
              />
            </div>
            <div className="project-meta">
              <dl>
                <dt>File Type:</dt>
                <dd>{ projectType }</dd>
                <br />
                <dt>Updated:</dt>
                <dd>{ updated }</dd>
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
                <dd>{ uploaded }</dd>
              </dl>
            </div>
          </footer>
        </article>
      </Fragment>
    );
  }
}

PreviewProjectContent.propTypes = {
  data: object
};

export default PreviewProjectContent;
