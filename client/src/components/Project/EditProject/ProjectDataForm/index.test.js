import React from 'react';
import { shallow } from 'enzyme';

import ProjectDataForm from './index';

describe( '<ProjectDataForm />', () => {
  it( 'renders without crashing', () => {
    shallow( <ProjectDataForm /> );
  } );
} );
