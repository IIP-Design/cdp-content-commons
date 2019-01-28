/**
 *
 * NavigationPrompt
 *
 */
import React, { Fragment } from 'react';
import { bool, func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class NavigationPrompt extends React.PureComponent {
  state = {
    nextLocation: null,
    displayPrompt: false
  }

  componentDidMount = () => {
    this.unblock = this.props.history.block( ( nextLocation ) => {
      if ( this.props.when ) {
        this.setState( {
          displayPrompt: true,
          nextLocation
        } );
      }
      return !this.props.when;
    } );
  }

  componentWillUnmount = () => {
    this.unblock();
  }

  onCancel = () => {
    this.setState( {
      nextLocation: null,
      displayPrompt: false
    } );
  }

  onConfirm = () => {
    this.navigateToNextLocation();
  }

  navigateToNextLocation = () => {
    this.unblock();
    this.props.history.push( this.state.nextLocation.pathname );
  }

  render = () => (
    <Fragment>
      { this.props.children( this.state.displayPrompt, this.onConfirm, this.onCancel ) }
    </Fragment>
  )
}

NavigationPrompt.propTypes = {
  when: bool.isRequired,
  children: func.isRequired,
  history: object
};

export default withRouter( NavigationPrompt );
