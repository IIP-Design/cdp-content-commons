import React from 'react';
import { shallow } from 'enzyme';

import ProjectItem from './index';

describe( '<ProjectItem />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectItem /> );
  } );
} );
