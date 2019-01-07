import React from 'react';
import { shallow } from 'enzyme';

import UploadSuccessMsg from './index';

describe( '<UploadSuccessMsg />', () => {
  it( 'renders without crashing', () => {
    shallow( <UploadSuccessMsg /> );
  } );
} );
