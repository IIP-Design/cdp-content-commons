import React from 'react';
import { shallow } from 'enzyme';

import VideoProjectFiles from './index';

describe( '<VideoProjectFiles />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoProjectFiles /> );
  } );
} );
