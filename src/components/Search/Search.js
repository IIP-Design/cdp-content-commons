import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { func, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form } from 'semantic-ui-react';
import './Search.css';

class Search extends Component {
  constructor( props ) {
    super( props );
    this.handleQueryOnChange = this.handleQueryOnChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  componentDidMount() {
    if ( !this.props.search.query && this.props.location.pathname === '/results' ) {
      this.props.search.query = sessionStorage.getItem( 'currentSearch' );

      this.props.createRequest();
      this.props.history.push( '/results' );
    }
  }

  handleQueryOnChange( e ) {
    this.props.updateSearchQuery( e.target.value );
  }

  handleSubmit( e ) {
    e.preventDefault();
    sessionStorage.setItem( 'currentSearch', this.props.search.query );

    this.props.postTypeQueryUpdate();
    this.props.sourceQueryUpdate();

    this.props.createRequest();
    this.props.history.push( '/results' );
  }

  render() {
    return (
      <section className="search_bar">
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group>
            <Form.Input
              placeholder="Type in keywords to search our content"
              className="search_input"
              onChange={ this.handleQueryOnChange }
              value={ this.props.search.query ? this.props.search.query : '' }
            />
            <Form.Button icon="search" type="submit" />
          </Form.Group>
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ( {
  search: state.search
} );

Search.propTypes = {
  updateSearchQuery: func,
  createRequest: func,
  postTypeQueryUpdate: func,
  sourceQueryUpdate: func,
  history: object,
  location: object,
  search: shape( {
    query: string
  } )
};

// wrap component in withRouter to get access to history
export default withRouter( connect( mapStateToProps, actions )( Search ) );
