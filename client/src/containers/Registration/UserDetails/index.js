/**
 *
 * UserDetails
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectJobTitle,
  selectCountry,
  selectCity,
  selectReference
} from './selectors';
import { Form, Button, Icon } from 'semantic-ui-react';
import Countries from './CountryList';
import './UserDetails.css';

/* eslint-disable react/prefer-stateless-function */
class UserDetails extends React.Component {
  state = {
    firstName: this.props.firstName || '',
    lastName: this.props.lastName || '',
    email: this.props.email || '',
    jobTitle: this.props.jobTitle || '',
    country: this.props.country || '',
    city: this.props.city || '',
    reference: this.props.reference || '',
    formErrors: {}
  }

  handleFirstName = ( e, { value } ) => {
    this.setState( { firstName: value } );
  }

  handleLastName = ( e, { value } ) => {
    this.setState( { lastName: value } );
  }

  handleEmail = ( e, { value } ) => {
    this.setState( { email: value } );
  }

  handleJobTitle = ( e, { value } ) => {
    this.setState( { jobTitle: value } );
  }

  handleCountry = ( e, { value } ) => {
    this.setState( { country: value } );
  }

  handleCity = ( e, { value } ) => {
    this.setState( { city: value } );
  }

  handleReference = ( e, { value } ) => {
    this.setState( { reference: value } );
  }

  handleOnSubmit = ( e ) => {
    e.persist();
    e.preventDefault();
    this.validateFields( e );
  }

  validateFields = ( evt ) => {
    const {
      firstName,
      lastName,
      email,
      country,
      jobTitle,
      city,
      reference,
      formErrors
    } = this.state;

    if ( firstName === '' ) { formErrors.firstName = true; } else { formErrors.firstName = false; }
    if ( lastName === '' ) { formErrors.lastName = true; } else { formErrors.lastName = false; }

    if (
      !email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )
      || email === ''
    ) {
      formErrors.email = true;
    } else {
      formErrors.email = false;
    }

    if ( country === '' ) { formErrors.country = true; } else { formErrors.country = false; }
    if ( city === '' ) { formErrors.city = true; } else { formErrors.city = false; }    

    const anyFormErrors = Object.values( formErrors );
    if ( anyFormErrors.includes( true ) ) {
      return this.setState( { formErrors } );
    }

    return this.setState( { formErrors }, () => {
      this.storeValidatedFields( firstName, lastName, email, jobTitle, country, city, reference );
      this.props.handleProgressClick( evt );
    } );
  }

  storeValidatedFields( firstName, lastName, email, jobTitle, country, city, reference ) {
    this.props.storeFirstName( firstName );
    this.props.storeLastName( lastName );
    this.props.storeEmail( email );
    this.props.storeJobTitle( jobTitle );
    this.props.storeCountry( country );
    this.props.storeCity( city );
    this.props.storeReference( reference );
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      country,
      city,
      reference,
      formErrors
    } = this.state;

    const { handleProgressClick } = this.props;

    return (
      <div className="userDetails">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              value={ firstName }
              onChange={ this.handleFirstName }
              required
              error={ formErrors.firstName }
            />
            <Form.Input
              label="Last Name"
              value={ lastName }
              onChange={ this.handleLastName }
              required
              error={ formErrors.lastName }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <div className="userDetails_emailAddress">
              <Form.Input
                type="email"
                label="Email Address"
                value={ email }
                onChange={ this.handleEmail }
                required
                error={ formErrors.email }
              />
              <span className="subtext">We recommend using your america.gov email if you have one.</span>
            </div>
            <Form.Input label="Job Title" value={ jobTitle } onChange={ this.handleJobTitle } />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              label="Country"
              placeholder="- Select Country"
              options={ Countries }
              value={ country }
              onChange={ this.handleCountry }
              required
              error={ formErrors.country }
            />
            <Form.Input
              label="City"
              value={ city }
              onChange={ this.handleCity }
              required
              error={ formErrors.city }
            />
          </Form.Group>
          <Form.TextArea label="How did you hear about the Content Commons?" value={ reference } onChange={ this.handleReference } />
          <div className="register_progress">
            <Button type="button" className="back" onClick={ handleProgressClick }>
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

UserDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  jobTitle: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  reference: PropTypes.string,
  storeFirstName: PropTypes.func,
  storeLastName: PropTypes.func,
  storeEmail: PropTypes.func,
  storeJobTitle: PropTypes.func,
  storeCountry: PropTypes.func,
  storeCity: PropTypes.func,
  storeReference: PropTypes.func,
  handleProgressClick: PropTypes.func
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  firstName: selectFirstName,
  lastName: selectLastName,
  email: selectEmail,
  jobTitle: selectJobTitle,
  country: selectCountry,
  city: selectCity,
  reference: selectReference
} );

export default connect( mapStateToProps, actions )( UserDetails );
