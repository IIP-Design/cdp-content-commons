import React from 'react';
import { shallow } from 'enzyme';

import ProjectsTable from './index';

describe( '<ProjectsTable />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectsTable /> );
  } );
} );
