import React from 'react';
import Recents from '../../Recents';
import Priorities from '../../Priorities';
import './LandingPage.css';

const LandingPage = () => (
  <section className="landing">
    <Priorities term="5G" categories={ [] } />
    <Priorities
      term="Iran"
      categories={ [
          { key: 'dLWWJ2MBCLPpGnLD3D-N', display_name: 'Economic Opportunity' },
          { key: 'lLWWJ2MBCLPpGnLD5z8X', display_name: 'Human Rights' },
          { key: 'JFqWJ2MBNxuyMP4E5Cgn', display_name: 'Global Issues' }
        ] }
    />
    <Recents postType="video" />
    <Recents postType="post" />
  </section>
);

export default LandingPage;
