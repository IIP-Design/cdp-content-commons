import React from 'react';
import { shallow } from 'enzyme';

import Focusable from './index';

describe( '<Focusable />', () => {
  it( 'renders without crashing', () => {
    shallow( <Focusable /> );
  } );
} );
