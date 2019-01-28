import React from 'react';
import { shallow } from 'enzyme';

import Notification from './index';

describe( '<Notification />', () => {
  it( 'renders without crashing', () => {
    shallow( <Notification /> );
  } );
} );
