import React, { Component } from 'react';
import { object } from 'prop-types';
import moment from 'moment';
import { Card, Image, Modal } from 'semantic-ui-react';
import ModalContent from '../../Modals/ModalContent';
import './ResultItem.css';

class ResultItem extends Component {
  getLanguage() {
    const { selectedLanguageUnit } = this.props.item;
    if ( !selectedLanguageUnit ) return 'English';
    return selectedLanguageUnit.language.display_name;
  }

  // eslint-disable-next-line class-methods-use-this
  renderCategory( category, index, arr ) {
    let { name } = category;
    const key = `cat_${index}`;
    if ( index > 2 ) {
      return undefined;
    }
    if ( arr.length - 1 !== index && index < 2 ) {
      name += '  ·';
    }

    return <span key={ key }>{ name.toLowerCase() }</span>;
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
    const { item } = this.props;

    return (
      <Card>
        <Modal
          closeIcon
          trigger={
            <div className="card_imgWrapper">
              <Image src={ item.thumbnail } width="100%" height="100%" />
              <Image src={ item.icon } className="card_postIcon" />
            </div>
          }
        >
          <Modal.Content>
            <ModalContent item={ item } />
          </Modal.Content>
        </Modal>
        <Card.Content>
          <Card.Header className="card_header">
            <Modal closeIcon trigger={ <p>{ item.title }</p> }>
              <Modal.Content>
                <ModalContent item={ item } />
              </Modal.Content>
            </Modal>
          </Card.Header>
          <Card.Description className="card_excerpt">{ item.description }</Card.Description>
          <div className="card_metadata">
            <Card.Meta>{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</Card.Meta>
            <Card.Meta>
              <a target="_blank" rel="noopener noreferrer" href={ item.sourcelink }>
                { item.site }
              </a>
            </Card.Meta>
            <Card.Meta>{ item.categories && item.categories.map( this.renderCategory ) }</Card.Meta>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

ResultItem.propTypes = {
  item: object
};

export default ResultItem;

/*
example: search lang = french
Is there a video marked as fr w/o burned in eng captions?
YES
  original =  french video + french SRT file"
  with Captions = french video w/burned in french captions + french SRT file"
NO
  original =  eng video + french SRT file"
  with Subtitles = eng video w/burned in french captions + french SRT file"

More = all avaialable SRT files
*/
