import React from 'react';
import { bool } from 'prop-types';
import { Header } from 'semantic-ui-react';
import Title from '../Title';

const Heading = props => (
  <Header as="h1">
    <Title isLanding={ props.isLanding } />
    <Header.Subheader className="subtitle">Making it easier to find public diplomacy content</Header.Subheader>
    <Header.Subheader className="subtext">
      Content Commons is a U.S. Department of State portal helping public diplomacy practitioners find what they need.
    </Header.Subheader>
  </Header>
);

Heading.propTypes = {
  isLanding: bool
};

export default Heading;
