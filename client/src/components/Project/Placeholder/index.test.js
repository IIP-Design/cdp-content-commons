import React from 'react';
import { shallow } from 'enzyme';

import Placeholder from './index';

describe( '<Placeholder />', () => {
  it( 'renders without crashing', () => {
    shallow( <Placeholder /> );
  } );
} );
