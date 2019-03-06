import React, { Component } from 'react';
import { object } from 'prop-types';
import moment from 'moment';
import { Card, Image, Modal } from 'semantic-ui-react';
import ModalContent from '../../Modals/ModalContent';

import './ResultItem.css';
import './ResultItemRTL.css';

import logoDos from '../../../assets/images/DOS_Seal.svg';

class ResultItem extends Component {
  getItemSource( textDirection ) {
    const { item } = this.props;
    let source;
    textDirection = textDirection === 'ltr' ? 'left' : 'right';
    if ( item.logo ) {
      source = (
        <div
          style={ {
            background: `url( ${item.logo} ) no-repeat ${textDirection}`,
            height: '16px',
            margin: '6px 0 0',
            marginLeft: '-1px'
          } }
          alt={ item.site }
        />
      );
    }
    const dosOwners = ['IIP Video', 'IIP Interactive', 'Public Affairs'];
    if ( !source && item.type === 'video' && dosOwners.includes( item.owner ) ) {
      source = (
        <div style={ { display: 'block', marginTop: '2px' } }>
          <div
            style={ {
              background: `url( ${logoDos} ) no-repeat`,
              height: '16px',
              width: '16px',
              float: textDirection,
              marginLeft: textDirection === 'left' ? '0' : '0.3em'
            } }
            alt={ item.owner }
          />
          <span style={ { marginTop: '1px', float: textDirection } }>{ item.owner }</span>
        </div>
      );
    }
    if ( !source && item.type === 'video' ) source = item.owner;
    if ( !source ) source = item.site;
    return item.type === 'video'
      ? source
      : <a target="_blank" rel="noopener noreferrer" href={ item.sourcelink }>{ source }</a>;
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

  render() {
    const { item } = this.props;
    let textDirection = 'ltr';
    if ( item.selectedLanguageUnit ) {
      textDirection = item.selectedLanguageUnit.language.text_direction;
    } else if ( item.language && item.language.text_direction ) {
      textDirection = item.language.text_direction;
    }

    const action = `openModal - ${item.title}`;

    return (
      <Card>
        <Modal
          closeIcon
          trigger={
            <div className="card_imgWrapper">
              <Image data-action={ action } src={ item.thumbnail } width="100%" height="100%" />
              <Image data-action={ action } src={ item.icon } className="card_postIcon" />
            </div>
          }
        >
          <Modal.Content>
            <ModalContent item={ item } />
          </Modal.Content>
        </Modal>
        <Card.Content className={ textDirection }>
          <Card.Header className="card_header">
            <Modal closeIcon trigger={ <p data-action={ action }>{ item.title }</p> }>
              <Modal.Content>
                <ModalContent item={ item } />
              </Modal.Content>
            </Modal>
          </Card.Header>
          <Card.Description className="card_excerpt">{ item.description }</Card.Description>
          <div className="card_metadata">
            <Card.Meta>{ moment( item.published ).format( 'MMMM DD, YYYY' ) }</Card.Meta>
            <Card.Meta>{ item.categories && item.categories.map( this.renderCategory ) }</Card.Meta>
            <Card.Meta>{ this.getItemSource( textDirection ) }</Card.Meta>
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
