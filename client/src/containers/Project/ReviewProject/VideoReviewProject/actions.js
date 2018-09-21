/*
 *
 * VideoReviewProject actions
 *
 */

import {
  DEFAULT_ACTION,
  TOGGLE_DISABLE_RIGHT_CLICK
} from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
}

export const toggleDisableRightClick = () => {
  return {
    type: TOGGLE_DISABLE_RIGHT_CLICK
  };
}


