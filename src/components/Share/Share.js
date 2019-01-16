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

  const queryStr = stringifyQueryString( { id, site, language } );
  const directLink = ( type === 'video' ) ? `${window.location.protocol}//${window.location.host}/video?${queryStr}` : link;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
  const tweet = `https://twitter.com/home?status=${title} ${link}`;

  return (
    <div>
      { link && (
        <List className="share_list">
          <ShareButton url={ facebookURL } icon="facebook f" label="Share on Facebook" />
          <ShareButton url={ tweet } icon="twitter" label="Share on Twitter" />
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
