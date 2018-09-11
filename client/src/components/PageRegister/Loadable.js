/**
 *
 * Asynchronously loads the component for PageRegister
 *
 */

import Loadable from 'react-loadable';

export default Loadable( {
  loader: () => import( './index' ),
  loading: () => null
} );
