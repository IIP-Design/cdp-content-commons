import React from 'react';
import { shallow } from 'enzyme';

import PreviewProject from './index';

describe( '<PreviewProject />', () => {
  it( 'renders without crashing', () => {
    shallow( <PreviewProject /> );
  } );
} );
