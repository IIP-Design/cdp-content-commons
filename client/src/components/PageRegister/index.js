/**
 *
 * PageRegister
 *
 */

import React from 'react';
import { Tab } from 'semantic-ui-react';
import Page from 'components/Page';
import SelectRole from 'containers/Registration/SelectRole';
import TeamDetails from 'containers/Registration/TeamDetails';
import UserDetails from 'containers/Registration/UserDetails';
import ReviewSubmit from 'containers/Registration/ReviewSubmit';
import './PageRegister.css';


/* eslint-disable react/prefer-stateless-function */
class PageRegister extends React.PureComponent {
  state = {
    activeIndex: 0,
    displayTeamDetails: false,
    panes: [
      {
        menuItem: 'Select Role',
        render: () => (
          <Tab.Pane attached={ false }>
            <SelectRole displayTeamPane={ this.displayTeamPane } handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'User Details',
        render: () => (
          <Tab.Pane attached={ false }>
            <UserDetails handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Review Submit',
        render: () => (
          <Tab.Pane attached={ false }>
            <ReviewSubmit handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      }
    ],
    panesTeamDetails: [
      {
        menuItem: 'Select Role',
        render: () => (
          <Tab.Pane attached={ false }>
            <SelectRole handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Team Details',
        render: () => (
          <Tab.Pane attached={ false }>
            <TeamDetails handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'User Details',
        render: () => (
          <Tab.Pane attached={ false }>
            <UserDetails handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Review & Submit',
        render: () => (
          <Tab.Pane attached={ false }>
            <ReviewSubmit handleProgressClick={ this.handleProgressClick } />
          </Tab.Pane>
        )
      }
    ]
  }

  handleProgressClick = ( e ) => {
    const goBack = e.target.className.includes( 'back' ) || e.target.className.includes( 'left' );
    // If team details pane displaying, reset to orig panes
    if ( goBack ) {
      return this.setState( prevState => (
        {
          activeIndex: prevState.activeIndex > 0 ? prevState.activeIndex - 1 : 0,
          displayTeamDetails: prevState.activeIndex === 1 && prevState.displayTeamDetails
            ? false
            : prevState.displayTeamDetails
        }
      ) );
    }

    return this.setState( ( prevState ) => {
      const panesLen = !prevState.displayTeamDetails
        ? prevState.panes.length
        : prevState.panesTeamDetails.length;

      return {
        activeIndex: prevState.activeIndex < panesLen - 1
          ? prevState.activeIndex + 1
          : panesLen - 1
      };
    } );
  }

  displayTeamPane = () => {
    this.setState( prevState => ( {
      activeIndex: prevState.activeIndex + 1,
      displayTeamDetails: true
    } ) );
  }
  
  render() {
    const {
      activeIndex,
      panes,
      panesTeamDetails,
      displayTeamDetails
    } = this.state;

    return (
      <Page title="Register" description="Create an account with Content Commons">
        <div className="register register_wrapper">
          <h1 className="register_title">Register</h1>
          <Tab
            menu={ { secondary: true, pointing: true } }
            panes={ !displayTeamDetails ? panes : panesTeamDetails }
            activeIndex={ activeIndex }
          />
        </div>
      </Page>
    );
  }
}

export default PageRegister;
