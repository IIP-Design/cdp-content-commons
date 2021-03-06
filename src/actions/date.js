import { DATE_CHANGE, FROM_DATE_CHANGE, TO_DATE_CHANGE } from './types';

// this is for date dropdown menu
export const dateUpdate = date => ( {
  type: DATE_CHANGE,
  payload: date
} );

export const fromDateUpdate = date => ( {
  type: FROM_DATE_CHANGE,
  payload: date
} );

export const toDateUpdate = date => ( {
  type: TO_DATE_CHANGE,
  payload: date
} );
