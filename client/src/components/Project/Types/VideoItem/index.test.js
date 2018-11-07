import React from 'react';
import { shallow } from 'enzyme';

import VideoItem from './index';

describe( '<VideoItem />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoItem /> );
  } );
} );
