import React from 'react';
import { shallow } from 'enzyme';

import ProjectHeader from './index';

describe( '<ProjectHeader />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectHeader /> );
  } );
} );
