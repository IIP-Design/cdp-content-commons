import React from 'react';
import { string, number } from 'prop-types';
import { List } from 'semantic-ui-react';
import ClipboardCopy from '../ClipboardCopy/ClipboardCopy';
import { stringifyQueryString } from '../../utils/browser';
import ShareButton from './ShareButton';

import './Share.css';

const Share = ( props ) => {
  const {
    id, site, language, title, link, type
  } = props;

  const queryStr = ( type === 'video' )
    ? stringifyQueryString( { id, site, language } )
    : stringifyQueryString( { id, site } );
  const re = /^.*content.*america\.gov.*$/;

  let directLink = link;
  if ( type === 'video' ) directLink = `${window.location.protocol}//${window.location.host}/video?${queryStr}`;
  if ( re.test( link ) && type === 'post' ) {
    directLink = `${window.location.protocol}//${window.location.host}/article?${queryStr}`;
  }

  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
  const tweet = `https://twitter.com/home?status=${title} ${link}`;

  return (
    <div>
      { link && (
        <List className="share_list">
          <ShareButton
            action={ `shareFacebook - ${title}` }
            icon="facebook f"
            label="Share on Facebook"
            url={ facebookURL }
          />
          <ShareButton
            action={ `shareTwitter - ${title}` }
            icon="twitter"
            label="Share on Twitter"
            url={ tweet }
          />
        </List>
      ) }
      <ClipboardCopy label="Direct Link" copyItem={ directLink } itemAction={ `copyShareLink - ${title}` } />
    </div>
  );
};

Share.propTypes = {
  id: number,
  site: string,
  language: string,
  link: string,
  title: string,
  type: string
};

export default Share;
