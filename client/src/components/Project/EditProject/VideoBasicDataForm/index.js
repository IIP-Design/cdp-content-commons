/**
 *
 * VideoBasicDataForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import './VideoBasicDataForm.css';

import {
  Form,
  Grid,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react';

import IconPopup from 'components/Project/EditProject/IconPopup';

const VideoBasicDataForm = ( props ) => {
  const videoQuality = (
    <label htmlFor="video-quality">
      Video Quality
      <IconPopup
        message="Web: small - for social sharing, Broadcast: large - ambassador videos"
        size="small"
        iconType="info circle"
      />
    </label>
  );

  return (
    <Form className="edit-video__form video-basic-data">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column mobile={ 16 } computer={ 10 }>
            <Form.Field
              id="video-title"
              control={ Input }
              label="Video Title in Language"
              autoFocus="true"
              name="title"
              // value={ videoTitle }
              // onChange={ handleChange }
            />

            <Form.Field
              id="video-description"
              control={ TextArea }
              label="Public Description in Language (e.g. - YouTube)"
              autoFocus="true"
              name="description"
            />

            <Form.Field
              id="video-keywords"
              control={ Input }
              label="Additional Keywords in Language"
              autoFocus="true"
              name="keywords"
            />
          </Grid.Column>

          <Grid.Column mobile={ 16 } computer={ 6 }>
            <Form.Field
              id="video-language"
              control={ Select }
              label="Language"
              options={
                [
                  {
                    value: 'english',
                    text: 'English'
                  },
                  {
                    value: 'arabic',
                    text: 'Arabic'
                  },
                  {
                    value: 'chinese',
                    text: 'Chinese (Simplified)'
                  },
                  {
                    value: 'french',
                    text: 'French'
                  },
                  {
                    value: 'portuguese',
                    text: 'Portuguese'
                  },
                  {
                    value: 'russian',
                    text: 'Russian'
                  },
                  {
                    value: 'spanish',
                    text: 'Spanish'
                  }
                ]
              }
              required
              autoFocus="true"
              value="english"
              name="language"
            />

            <Form.Field
              id="video-subtitles"
              control={ Select }
              label="Subtitles & Captions"
              options={
                [
                  {
                    value: 'clean',
                    text: 'Clean'
                  },
                  {
                    value: 'subtitles',
                    text: 'Subtitles'
                  }
                ]
              }
              required
              autoFocus="true"
              value="clean"
              name="subtitles"
            />

            <Form.Field
              id="video-type"
              control={ Select }
              label="Video Type"
              options={
                [
                  {
                    value: 'full',
                    text: 'Full Video'
                  },
                  {
                    value: 'teaser',
                    text: 'Promotional Teaser'
                  },
                  {
                    value: 'embargoed',
                    text: 'Embargoed'
                  }
                ]
              }
              required
              autoFocus="true"
              value="full"
              name="type"
            />

            <Form.Field
              id="video-quality"
              control={ Select }
              label={ videoQuality }
              options={
                [
                  {
                    value: 'web',
                    text: 'For web'
                  },
                  {
                    value: 'broadcast',
                    text: 'For broadcast'
                  }
                ]
              }
              required
              autoFocus="true"
              value="web"
              name="quality"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

VideoBasicDataForm.propTypes = {};

export default VideoBasicDataForm;
