import React from 'react';
import { shallow } from 'enzyme';

import EditSupportFilesContent from './index';

describe( '<EditSupportFilesContent />', () => {
  it( 'renders without crashing', () => {
    shallow( <EditSupportFilesContent /> );
  } );
} );
