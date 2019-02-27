import React, { Component } from 'react';
import moment from 'moment';
import { v4 } from 'uuid';
import { func, string, object } from 'prop-types';
import { typeRecentsRequest } from '../../utils/api';
import { Grid, Header, Item, Modal } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Recents.css';
import { normalizeItem } from '../../utils/parser';
import ModalContent from '../Modals/ModalContent';

class Recents extends Component {
  async componentWillMount() {
    this.props.clearFilters();
    const currentLang = 'en-us';
    const response = await typeRecentsRequest( this.props.postType, currentLang );
    this.setState( {
      recents: response
    } );
  }

  componentDidMount() {
    this.props.loadPostTypes();
  }

  getLabel = ( type ) => {
    if ( !type.list.length ) return '';
    const typeObj = type.list.find( item => item.key === this.props.postType );
    if ( !typeObj || !typeObj.display_name ) return '';
    return typeObj.display_name;
  }

  handleClick = async ( e ) => {
    e.preventDefault();
    // NOTE: although filters are cleared from search component when on landing page
    // need to clear here in the evetn BACK button is pushed and componentDidMount is
    // not called on landing page
    this.props.clearFilters();
    this.props.updateSort( 'published' );

    // enable post type in filter
    this.props.postTypeUpdate( {
      key: this.props.postType,
      display_name: this.getLabel( this.props.type ),
      checked: true
    } );

    await this.props.createRequest();
    this.props.history.push( '/results' );
  }

  render() {
    let items;
    if ( this.state && this.state.recents.hits ) {
      items = this.state.recents.hits.hits;
    } else {
      return <div />;
    }

    const itemsright = [];

    items = items.map( item => normalizeItem( item ) );

    items.slice( 1 ).forEach( ( item ) => {
      let categories = '';
      item.categories.forEach( ( cat, index ) => {
        categories += ( item.categories.length === index + 1 )
          ? cat.name.toLowerCase()
          : `${cat.name.toLowerCase()}  · `;
      } );

      const action = `openModal - ${item.title}`;

      itemsright.push( (
        <Modal
          key={ v4() }
          closeIcon
          trigger={
            <Item className="recentsItem" data-action={ action }>
              <div
                className="recentsItem_img"
                data-action={ action }
                style={ { backgroundImage: `url( ${item.thumbnail} )` } }
              >
                <img
                  alt={ `${this.props.postType} icon` }
                  className="metaicon"
                  data-action={ action }
                  src={ item.icon }
                />
              </div>
              <Item.Content data-action={ action }>
                <Item.Header data-action={ action }>{ item.title }</Item.Header>
                <div className="meta" >
                  <span className="date" data-action={ action }>
                    { moment( item.published ).format( 'MMMM DD, YYYY' ) }
                  </span>
                  <span className="categories" data-action={ action }>{ categories }</span>
                </div>
              </Item.Content>
            </Item>
          }
        >
          <Modal.Content>
            <ModalContent item={ item } />
          </Modal.Content>
        </Modal>
      ) );
    } );

    return (
      <section className="recents">
        <div className="recentstitle">
          <Header as="h1" size="large">Most Recent { this.getLabel( this.props.type ) }s</Header>
          <Link to="/results" className="browseAll" onClick={ this.handleClick } >
            Browse All { this.getLabel( this.props.type ) }s
          </Link>
        </div>
        <Grid columns="equal" stackable stretched>
          <Grid.Column width={ 8 } className="recentsgridleft" >
            { items[0] &&
              <Modal
                closeIcon
                trigger={
                  <div
                    className="recentsleft"
                    data-action={ `openModal - ${items[0].title}` }
                    style={ { backgroundImage: `url( ${items[0].thumbnail} )` } }
                  >
                    <div className="recentsoverlay">
                      <div
                        className="recentsoverlay_title"
                        data-action={ `openModal - ${items[0].title}` }
                      >
                        { items[0].title }
                      </div>
                      <img
                        src={ items[0].icon }
                        className="recentsoverlay_icon"
                        data-action={ `openModal - ${items[0].title}` }
                        alt={ `${this.props.postType} icon` }
                      />
                    </div>
                  </div>
                }
              >
                <Modal.Content>
                  <ModalContent item={ items[0] } />
                </Modal.Content>
              </Modal>
            }
          </Grid.Column>
          <Grid.Column width={ 8 } className="recentsgridright">
            <Item.Group>{ itemsright }</Item.Group>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  type: state.type
} );

Recents.propTypes = {
  createRequest: func,
  loadPostTypes: func,
  postTypeUpdate: func,
  clearFilters: func,
  updateSort: func,
  postType: string,
  type: object,
  history: object
};

export default withRouter( connect( mapStateToProps, actions )( Recents ) );
