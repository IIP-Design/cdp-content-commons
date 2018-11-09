import React from 'react';
import { shallow } from 'enzyme';

import ProjectSupportFiles from './index';

describe( '<ProjectSupportFiles />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectSupportFiles /> );
  } );
} );
