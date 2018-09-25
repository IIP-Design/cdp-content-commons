import React from 'react';
import { shallow } from 'enzyme';

import VideoSupportFiles from './index';

describe( '<VideoSupportFiles />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoSupportFiles /> );
  } );
} );
