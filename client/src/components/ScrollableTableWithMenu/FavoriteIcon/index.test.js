import React from 'react';
import { shallow } from 'enzyme';

import FavoriteIcon from './index';

describe( '<FavoriteIcon />', () => {
  it( 'renders without crashing', () => {
    shallow( <FavoriteIcon /> );
  } );
} );
