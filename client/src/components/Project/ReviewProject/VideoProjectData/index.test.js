import React from 'react';
import { shallow } from 'enzyme';

import VideoProjectData from './index';

describe( '<VideoProjectData />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoProjectData /> );
  } );
} );
