import React from 'react';
import { shallow } from 'enzyme';

import VideoBasicDataForm from './index';

describe( '<VideoBasicDataForm />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoBasicDataForm /> );
  } );
} );
