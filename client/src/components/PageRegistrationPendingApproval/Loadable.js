/**
 *
 * Asynchronously loads the component for PageRegistrationPendingApproval
 *
 */

import Loadable from 'react-loadable';

export default Loadable( {
  loader: () => import( './index' ),
  loading: () => null
} );
