import React from 'react';
import { shallow } from 'enzyme';

import PreviewProjectContent from './index';

describe( '<PreviewProjectContent />', () => {
  it( 'renders without crashing', () => {
    shallow( <PreviewProjectContent /> );
  } );
} );
