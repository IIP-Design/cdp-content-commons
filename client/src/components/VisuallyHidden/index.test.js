import React from 'react';
import { shallow } from 'enzyme';

import VisuallyHidden from './index';

describe( '<VisuallyHidden />', () => {
  it( 'renders without crashing', () => {
    shallow( <VisuallyHidden /> );
  } );
} );
