import React from 'react';
import { shallow } from 'enzyme';

import SupportItem from './index';

describe( '<SupportItem />', () => {
  it( 'renders without crashing', () => {
    shallow( <SupportItem /> );
  } );
} );
