/*
 *
 * VideoEditProject actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export const defaultAction = videoID => ( {
  type: DEFAULT_ACTION,
  payload: videoID
} );
