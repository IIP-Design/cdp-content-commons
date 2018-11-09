import React from 'react';
import { shallow } from 'enzyme';

import StatusMessages from './index';

describe( '<StatusMessages />', () => {
  it( 'renders without crashing', () => {
    shallow( <StatusMessages /> );
  } );
} );
