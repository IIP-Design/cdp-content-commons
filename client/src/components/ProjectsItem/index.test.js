import React from 'react';
import { shallow } from 'enzyme';

import ProjectsItem from './index';

describe( '<ProjectsItem />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectsItem /> );
  } );
} );
