import React from 'react';
import { shallow } from 'enzyme';

import FormInstructions from './index';

describe( '<FormInstructions />', () => {
  it( 'renders without crashing', () => {
    shallow( <FormInstructions /> );
  } );
} );
