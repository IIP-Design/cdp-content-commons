import React from 'react';
import { shallow } from 'enzyme';

import PageLogin from './index';

describe( '<PageLogin />', () => {
  it( 'renders without crashing', () => {
    shallow( <PageLogin /> );
  } );
} );
