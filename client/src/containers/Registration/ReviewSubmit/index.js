/**
 *
 * ReviewSubmit
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Icon } from 'semantic-ui-react';
import './ReviewSubmit.css';

/* eslint-disable react/prefer-stateless-function */
class ReviewSubmit extends React.Component {
  state = {
    tosAgreed: false,
    formErrors: {},
    redirect: false
  }

  handleOnSubmit = ( e ) => {
    e.preventDefault();
    const { tosAgreed, formErrors } = this.state;

    if ( !tosAgreed ) {
      formErrors.tosAgreed = true;
      return this.setState( { formErrors } );
    }

    formErrors.tosAgreed = false;
    return this.setState( { formErrors, redirect: true } );
  }

  handleTermAgmt = ( e ) => {
    const { formErrors } = this.state;
    formErrors.tosAgreed = false;
    this.setState( { tosAgreed: true, formErrors } );
  }

  render() {
    const {
      selectRole,
      userDetails,
      teamDetails,
      handleProgressClick
    } = this.props;

    const {
      redirect,
      formErrors
    } = this.state;

    if ( redirect ) {
      return <Redirect to="/registration-pending-approval" />;
    }

    return (
      <div className="reviewSubmit">
        <p className="reviewSubmit_headline">Review your information and submit your request for a Content Commons account.</p>
        <section className="reviewSubmit_info">
          <p><b>Name:</b> { userDetails.firstName } { userDetails.lastName }</p>
          <p><b>Email:</b> { userDetails.email }</p>
          { userDetails.jobTitle && <p><b>Job Title:</b> { userDetails.jobTitle }</p> }
          { selectRole.teamSelection && <p><b>Team:</b> { selectRole.teamSelection }</p> }
          <p><b>Location:</b> { userDetails.city }, { userDetails.country } </p>
          <p className="reviewSubmit_info_role"><b>Role:</b> { selectRole.role }</p>
          {
            teamDetails.teamName !== '' &&
            <div className="reviewSubmit_newTeamInfo">
              <p><b>New Team Name:</b> { teamDetails.teamName }</p>
              <p><b>Organization:</b> { teamDetails.agencySelection }</p>
              <p>
                <b>Content: </b>
                { teamDetails.contentType.map( ( team, indx, types ) => {
                  if ( indx === types.length - 1 ) return team;
                  return `${team}, `;
                } ) }
              </p>
            </div>
          }
        </section>

        <Form onSubmit={ this.handleOnSubmit }>
          <Form.Field className={ formErrors.tosAgreed ? 'tosAgmt error' : 'tosAgmt' }>
            <label htmlFor="tosAgmtRadio">
              <input id="tosAgmtRadio" type="radio" onChange={ this.handleTermAgmt } />
              { "I agree to the Content Publisher's " }<Link to="/termsofservice">Terms of Use</Link>
            </label>
          </Form.Field>
          <div className="register_progress">
            <Button className="back" onClick={ handleProgressClick }>
              <Icon size="large" name="long arrow left" /> Previous
            </Button>
            <Button type="submit" className="forward">
              <span>Submit!</span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

ReviewSubmit.propTypes = {
  selectRole: PropTypes.object,
  userDetails: PropTypes.object,
  teamDetails: PropTypes.object,
  handleProgressClick: PropTypes.func
};

const mapStateToProps = ( { selectRole, userDetails, teamDetails } ) => ( {
  selectRole,
  userDetails,
  teamDetails
} );

export default connect( mapStateToProps )( ReviewSubmit );
