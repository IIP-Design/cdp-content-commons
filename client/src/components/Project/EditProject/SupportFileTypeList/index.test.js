import React from 'react';
import { shallow } from 'enzyme';

import SupportFileTypeList from './index';

describe( '<SupportFileTypeList />', () => {
  it( 'renders without crashing', () => {
    shallow( <SupportFileTypeList /> );
  } );
} );
