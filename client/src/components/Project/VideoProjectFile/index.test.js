import React from 'react';
import { shallow } from 'enzyme';

import VideoProjectFile from './index';

describe( '<VideoProjectFile />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoProjectFile /> );
  } );
} );
