/*
 *
 * TeamDetails reducer
 *
 */

import {
  DEFAULT_ACTION,
  TEAM_NAME,
  AGENCY_SELECTION,
  CONTENT_TYPE_SELECTION
} from './constants';


const INITIAL_STATE = {
  teamName: '',
  agencySelection: '',
  contentType: [],
  agencies: [
    { key: 'usaid', text: 'Agency for International Development (USAID)', value: 'Agency for International Development (USAID)' },
    { key: 'dod', text: 'Department of Defense', value: 'Department of Defense' },
    { key: 'dos', text: 'Department of State', value: 'Department of State' },
    { key: 'nasa', text: 'National Aeronautics and Space Administration', value: 'National Aeronautics and Space Administration' },
    { key: 'wh', text: 'White House', value: 'White House' }
  ],
  contentTypes: [
    { key: 'Audio', text: 'Audio', description: 'Audio files of podcasts, music, b-roll audio, etc.' },
    { key: 'Documents and Resources', text: 'Documents and Resources', description: 'Word documents, PowerPoint decks, PDFs, reports, training guides, etc.' },
    { key: 'Imagery', text: 'Imagery', description: 'Photos, social media graphics, posters, web graphics, etc.' },
    { key: 'Teaching Materials', text: 'Teaching Materials', description: 'Courses, lessons, glossaries, quizzes, etc.' },
    { key: 'Video', text: 'Video', description: 'Video files for web and broadcast use.' }
  ]
};

function teamDetailsReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;

    case TEAM_NAME:
      return {
        ...state,
        teamName: action.payload
      };

    case AGENCY_SELECTION:
      return {
        ...state,
        agencySelection: action.payload
      };

    case CONTENT_TYPE_SELECTION:
      return {
        ...state,
        contentType: action.payload
      };
      
    default:
      return state;
  }
}

export default teamDetailsReducer;
