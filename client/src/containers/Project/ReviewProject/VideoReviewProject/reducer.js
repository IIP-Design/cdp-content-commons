/*
 *
 * VideoReviewProject reducer
 *
 */

import sampleThumbSM from '../../../../assets/images/Projects/madeinamerica_small.jpg';
import sampleThumbMD from '../../../../assets/images/Projects/madeinamerica_med.jpg';

import { DEFAULT_ACTION } from './constants';

const INITIAL_STATE = {
  project_data: {
    video_title: 'Made in America',
    author: 'Jane Doe',
    owner: 'IIP Video Production',
    privacy_setting: 'Anyone can see this project',
    categories: ['Science & Technology'],
    tags: ['economy', 'manufacturing'],
    public_description: 'The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.',
    internal_description: 'Use this video on social media and embed on web pages to engage audiences in the importance of Economic Prosperity.'
  },
  support_files: {
    srt_files: [
      { lang: 'Arabic', file: 'madeinamerica_arabic.srt' },
      { lang: 'Chinese', file: 'madeinamerica_chinese.srt' },
      { lang: 'English', file: 'madeinamerica_english.srt' },
      { lang: 'French', file: 'madeinamerica_french.srt' }
    ],
    thumbnail_files: {
      disable_right_click: false,
      files: [
        { lang: 'Arabic', file: sampleThumbSM },
        { lang: 'Chinese', file: sampleThumbSM },
        { lang: 'English', file: sampleThumbSM },
        { lang: 'French', file: sampleThumbSM }
      ]
    },
    additional_files: [
      { lang: 'English', file: 'madeinamerica_english.mp3' }
    ]
  },
  videos: [
    {
      title: 'Made in America',
      thumbnail: sampleThumbMD,
      file_name: 'madeinamerica_english.mp4',
      file_size: '631.9MB',
      dimensions: '1920 x 1080',
      uploaded: 'April 13, 2018 at 3:45 PM',
      duration: '9:16',
      language: 'English',
      subtitles_captions: 'Clean - No Captions',
      video_type: 'Full Video',
      quality: 'For Web',
      public_description: 'The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.',
      youtube_url: 'youtube.com/videourl'
    },
    {
      title: 'Fabriqué en Amérique',
      thumbnail: sampleThumbMD,
      file_name: 'madeinamerica_french.mp4',
      file_size: '631.9MB',
      dimensions: '1920 x 1080',
      uploaded: 'April 13, 2018 at 3:45 PM',
      duration: '9:16',
      language: 'French',
      subtitles_captions: 'Clean - No Captions',
      video_type: 'Full Video',
      quality: 'For Web',
      public_description: 'La valeur et le sens de l’expression Fabriqué en Amérique, ont leur origine dans un passé riche d’innovation et de persévérance. Découvrez une partie de l’histoire de l’industrie manufacturière aux États-Unis et l’influence positive qu’elle a eue sur le monde, dans le passé et encore aujourd’hui.',
      additional_keywords: ['la valeur', 'innovation', 'ipsum'],
      youtube_url: 'youtube.com/videourl'
    }
  ]
};

function videoReviewProjectReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;
      
    default:
      return state;
  }
}

export default videoReviewProjectReducer;
