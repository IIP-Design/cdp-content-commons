import React, { Component } from 'react';
import moment from 'moment';
import { v4 } from 'uuid';
import { func, string, object, array } from 'prop-types';
import { typePrioritiesRequest } from '../../utils/api';
import { Grid, Header, Item, Modal } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Priorities.css';
import { normalizeItem } from '../../utils/parser';
import ModalContent from '../Modals/ModalContent';

class Priorities extends Component {
  async componentWillMount() {
    this.props.clearFilters();
    const currentLang = 'en-us';
    const response = await typePrioritiesRequest( this.props.term, currentLang, this.props.categories );
    this.setState( {
      priorities: response
    } );
  }

  componentDidMount() {
    this.props.loadPostTypes();
  }

  handleClick = async ( e ) => {
    e.preventDefault();
    // NOTE: although filters are cleared from search component when on landing page
    // need to clear here in the evetn BACK button is pushed and componentDidMount is
    // not called on landing page
    this.props.clearFilters();
    this.props.updateSort( 'relevance' );

    // set categories
    this.props.categories.forEach( ( category ) => {
      this.props.categoryUpdate( { key: category.key, display_name: category.display_name, checked: true } );
    } );

    // set search term
    this.props.updateSearchQuery( this.props.term );

    await this.props.createRequest();
    this.props.history.push( '/results' );
  }

  render() {
    let items;
    if ( this.state && this.state.priorities.hits && this.state.priorities.hits.total > 2 ) {
      items = this.state.priorities.hits.hits;
    } else {
      return <div />;
    }

    const itemsright = [];

    items = items.map( item => normalizeItem( item ) );

    items.slice( 1 ).forEach( ( item ) => {
      let categories = '';
      item.categories.slice( 0, 3 ).forEach( ( cat, index ) => {
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
            <Item className="prioritiesItem" data-action={ action }>
              <div
                className="prioritiesItem_img"
                data-action={ action }
                style={ { backgroundImage: `url( ${item.thumbnail} )` } }
              >
                <img
                  alt="icon"
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
      <section className="priorities">
        <div className="prioritiescontainer">
          <div className="prioritiestitle">
            <Header as="h1" size="large">Department Priority: { this.props.term }</Header>
            <Link to="/results" className="browseAll" onClick={ this.handleClick } >Browse All</Link>
          </div>
          <Grid columns="equal" stackable stretched>
            <Grid.Column width={ 8 } className="prioritiesgridleft" >
              { items[0] &&
                <Modal
                  closeIcon
                  trigger={
                    <div
                      className="prioritiesleft"
                      data-action={ `openModal - ${items[0].title}` }
                      style={ { backgroundImage: `url( ${items[0].thumbnail} )` } }
                    >
                      <div className="prioritiesoverlay">
                        <div
                          className="prioritiesoverlay_title"
                          data-action={ `openModal - ${items[0].title}` }
                        >
                          { items[0].title }
                        </div>
                        <img
                          src={ items[0].icon }
                          className="prioritiesoverlay_icon"
                          data-action={ `openModal - ${items[0].title}` }
                          alt="icon"
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
            <Grid.Column width={ 8 } className="prioritiesgridright">
              <Item.Group>{ itemsright }</Item.Group>
            </Grid.Column>
          </Grid>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  type: state.type
} );

Priorities.propTypes = {
  createRequest: func,
  loadPostTypes: func,
  updateSearchQuery: func,
  categoryUpdate: func,
  clearFilters: func,
  updateSort: func,
  term: string,
  categories: array,
  history: object
};

export default withRouter( connect( mapStateToProps, actions )( Priorities ) );
