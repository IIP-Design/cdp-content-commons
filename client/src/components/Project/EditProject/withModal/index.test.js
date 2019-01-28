import React from 'react';
import { shallow } from 'enzyme';

import WithModal from './index';

describe( '<WithModal />', () => {
  it( 'renders without crashing', () => {
    shallow( <WithModal /> );
  } );
} );
