/**
 *
 * TeamDetails
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import {
  selectTeamName,
  selectAgencySelection,
  selectContentType,
  selectAgencies,
  selectContentTypes
} from './selectors';
import { Form, Button, Icon } from 'semantic-ui-react';
import './TeamDetails.css';

/* eslint-disable react/prefer-stateless-function */
class TeamDetails extends React.Component {
  state = {
    teamName: this.props.teamName || '',
    agencySelection: this.props.agencySelection || '',
    contentType: this.props.contentType || '',
    formErrors: {}
  }

  handleTeamNameChange = ( e, { value } ) => {
    this.setState( { teamName: value } );
  }

  handleTeamAgencyChange = ( e, { value } ) => {
    this.setState( { agencySelection: value } );
  }

  handleContentTypeClick = ( e ) => {
    const type = e.target.value;
    this.setState( ( prevState ) => {
      const hasType = prevState.contentType.includes( type );
      const updatedContentType = hasType
        ? prevState.contentType.filter( contentType => contentType !== type )
        : [...prevState.contentType, type];
      return {
        contentType: updatedContentType
      };
    } );
  }

  handleOnSubmit = ( e ) => {
    e.persist();
    e.preventDefault();
    this.validateFields( e );
  }

  validateFields = ( e ) => {
    const {
      teamName,
      agencySelection,
      contentType,
      formErrors
    } = this.state;

    if ( teamName === '' ) { formErrors.teamName = true; } else { formErrors.teamName = false; }
    if ( agencySelection === '' ) { formErrors.agencySelection = true; } else { formErrors.agencySelection = false; }

    const anyFormErrors = Object.values( formErrors );
    if ( anyFormErrors.includes( true ) ) {
      return this.setState( { formErrors } );
    }

    return this.setState( { formErrors }, () => {
      this.storeValidatedFields( teamName, agencySelection, contentType );
      this.props.addTeam( teamName );
      this.props.handleProgressClick( e );
    } );
  }

  storeValidatedFields = ( teamName, agencySelection, contentType ) => {
    this.props.storeTeamName( teamName );
    this.props.storeAgencySelection( agencySelection );
    this.props.storeContentType( contentType );
  }

  render() {
    const {
      agencies,
      contentTypes,
      handleProgressClick
    } = this.props;

    const {
      teamName,
      agencySelection,
      contentType,
      formErrors
    } = this.state;

    return (
      <div className="teamDetails">
        <Form>
          <Form.Input
            label="What would you like to name this team?"
            value={ teamName }
            onChange={ this.handleTeamNameChange }
            required
            error={ formErrors.teamName }
          />
          <Form.Select
            label="Which USG agency is this team associated with?"
            placeholder="- Select agency"
            options={ agencies }
            value={ agencySelection }
            onChange={ this.handleTeamAgencyChange }
            required
            error={ formErrors.agencySelection }
          />
          <Form.Group grouped>
            <p className="register_question">What type of content will this team be contributing to the Content Commons? (select all that apply)</p>
            { contentTypes.map( type => (
              <div className="contentOption_wrapper" key={ type.key }>
                <Form.Field
                  value={ type.text }
                  onClick={ this.handleContentTypeClick }
                  label={ type.text }
                  control="input"
                  type="checkbox"
                  className="teamDetails_contentOption"
                  defaultChecked={ contentType.includes( type.text ) }
                />
                <p className="subtext">{ type.description }</p>
              </div>
            ) ) }
          </Form.Group>
          <div className="register_progress">
            <Button className="back" onClick={ handleProgressClick }>
              <Icon size="large" name="long arrow left" /> Previous
            </Button>
            <Button type="submit" className="forward" onClick={ this.handleOnSubmit }>
              <span>Next <Icon size="large" name="long arrow right" /></span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

TeamDetails.propTypes = {
  teamName: PropTypes.string,
  agencySelection: PropTypes.string,
  contentType: PropTypes.array,
  agencies: PropTypes.array,
  contentTypes: PropTypes.array,
  addTeam: PropTypes.func,
  handleProgressClick: PropTypes.func,
  storeTeamName: PropTypes.func,
  storeAgencySelection: PropTypes.func,
  storeContentType: PropTypes.func
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  teamName: selectTeamName,
  agencySelection: selectAgencySelection,
  contentType: selectContentType,
  agencies: selectAgencies,
  contentTypes: selectContentTypes
} );

export default connect( mapStateToProps, actions )( TeamDetails );
