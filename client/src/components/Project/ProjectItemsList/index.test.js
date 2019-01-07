import React from 'react';
import { shallow } from 'enzyme';

import ProjectItemsList from './index';

describe( '<ProjectItemsList />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectItemsList /> );
  } );
} );
