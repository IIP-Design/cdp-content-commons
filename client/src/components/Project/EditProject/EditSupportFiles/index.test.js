import React from 'react';
import { shallow } from 'enzyme';

import EditSupportFiles from './index';

describe( '<EditSupportFiles />', () => {
  it( 'renders without crashing', () => {
    shallow( <EditSupportFiles /> );
  } );
} );
