/**
 *
 * Asynchronously loads the component for EditProject
 *
 */

import Loadable from 'react-loadable';

export default Loadable( {
  loader: () => import( './index' ),
  loading: () => null
} );
