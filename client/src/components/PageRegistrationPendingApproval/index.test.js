import React from 'react';
import { shallow } from 'enzyme';

import PageRegistrationPendingApproval from './index';

describe( '<PageRegistrationPendingApproval />', () => {
  it( 'renders without crashing', () => {
    shallow( <PageRegistrationPendingApproval /> );
  } );
} );
