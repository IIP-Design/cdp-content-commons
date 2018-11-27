import React from 'react';
import { shallow } from 'enzyme';

import VideoLinkDataForm from './index';

describe( '<VideoLinkDataForm />', () => {
  it( 'renders without crashing', () => {
    shallow( <VideoLinkDataForm /> );
  } );
} );
