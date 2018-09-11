/**
 *
 * SelectRole
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { selectTeamRole, selectTeams, selectTeamSelection } from './selectors';
import { Form, Checkbox, Select, Button, Icon } from 'semantic-ui-react';
import './SelectRole.css';

const options = [
  {
    key: 1,
    value: 'Browse and Collect',
    label: 'Browse and collect only (standard)',
    content: 'Browse, download, and share published and draft material on Content Commons, create personal collections of materials, and save searches.'
  },
  {
    key: 2,
    value: 'Edit and Publish',
    label: 'Edit and publish content',
    content: 'In addition to standard access, upload, manage, and publish new content to the Content Commons.'
  },
  {
    key: 3,
    value: 'Team Admin',
    label: 'Team Admin',
    content: 'Full access to the content commons. This role can create and manage teams.'
  }
];

/* eslint-disable react/prefer-stateless-function */
class SelectRole extends React.PureComponent {
  handleRoleChange = ( e, { value } ) => {
    this.props.storeRole( value );
  };

  handleTeamSelect = ( e, { value } ) => {
    this.props.storeTeam( value );
  }

  render() {
    const {
      displayTeamPane,
      role,
      teams,
      teamSelection,
      handleProgressClick
    } = this.props;

    return (
      <div className="selectRole">
        <p className="register_question">What kind of access would you like when using the Content Commons?</p>
        <Form>
          { options.map( option => (
            <Form.Field key={ option.key } className="register_option">
              <Checkbox
                key={ option.key }
                radio
                label={ option.label }
                onChange={ this.handleRoleChange }
                value={ option.value }
                checked={ role === option.value }
              />
              <p className="checkbox_content">{ option.content }</p>
            </Form.Field>
          ) ) }
          { ( role === 'Edit and Publish' || role === 'Team Admin' ) &&
            <div>
              <Form.Field className="register_selectTeam">
                <p className="register_question">Which team will you be a part of?</p>
                <Select
                  placeholder="- Select Team"
                  options={ teams }
                  value={ teamSelection }
                  onChange={ this.handleTeamSelect }
                />
              </Form.Field>
              <Button
                onKeyUp={ displayTeamPane }
                onClick={ displayTeamPane }
                className="newTeam"
              >
                { 'I don\'t see my team\'s name. Request new...' }
              </Button>
            </div>
          }
          <div className="register_progress init">
            <Button type="submit" className="forward" onClick={ handleProgressClick }>
              <span>Next <Icon size="large" name="long arrow right" /></span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

SelectRole.propTypes = {
  role: PropTypes.string,
  teams: PropTypes.array,
  teamSelection: PropTypes.string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  role: selectTeamRole,
  teams: selectTeams,
  teamSelection: selectTeamSelection
} );

export default connect( mapStateToProps, actions )( SelectRole );
