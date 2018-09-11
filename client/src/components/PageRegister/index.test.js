import React from 'react';
import { shallow } from 'enzyme';

import PageRegister from './index';

describe( '<PageRegister />', () => {
  it( 'renders without crashing', () => {
    shallow( <PageRegister /> );
  } );
} );
