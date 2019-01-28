import React from 'react';
import { shallow } from 'enzyme';

import IconPopup from './index';

describe( '<IconPopup />', () => {
  it( 'renders without crashing', () => {
    shallow( <IconPopup /> );
  } );
} );
