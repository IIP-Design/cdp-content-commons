import React from 'react';
import { string } from 'prop-types';
import { List } from 'semantic-ui-react';
import './Share.css';

const Share = ( props ) => {
  const { shareLink, contentTitle } = props;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`;
  const tweetURL = `https://twitter.com/home?status=${contentTitle} ${shareLink}`;

  const sharePopup = ( url ) => {
    const { userAgent } = navigator;
    const mobile = () => (
      /\b(iPhone|iP[ao]d)/.test( userAgent )
      || /\b(iP[ao]d)/.test( userAgent )
      || /Android/i.test( userAgent )
      || /Mobile/i.test( userAgent )
    );
    const screenX = window.screenX !== undefined ? window.screenX : window.screenLeft;
    const screenY = window.screenY !== undefined ? window.screenY : window.screenTop;
    const outerWidth = window.outerWidth !== undefined ? window.outerWidth : document.documentElement.clientWidth;
    const outerHeight = window.outerHeight !== undefined
      ? window.outerHeight
      : document.documentElement.clientHeight - 22;
    const targetWidth = mobile() ? null : 500;
    const targetHeight = mobile() ? null : 500;
    const V = screenX < 0 ? window.screen.width + screenX : screenX;
    const left = parseInt( V + ( ( outerWidth - targetWidth ) / 2 ), 10 );
    const top = parseInt( screenY + ( ( outerHeight - targetHeight ) / 2.5 ), 10 );
    const features = [];

    if ( targetWidth !== null ) { features.push( `width=${targetWidth}` ); }
    if ( targetHeight !== null ) { features.push( `height=${targetHeight}` ); }

    features.push( `left=${left}`, `top=${top}`, 'scrollbars=1' );

    const newWin = window.open( url, contentTitle, features.join( ',' ) );
    if ( window.focus ) { newWin.focus(); }
    return newWin;
  };

  return (
    <div>
      <List horizontal className="share_list">
        <List.Item
          as="a"
          href={ facebookURL }
          onClick={ ( e ) => { e.preventDefault(); sharePopup( facebookURL ); } }
          onKeyPress={ ( e ) => { e.preventDefault(); sharePopup( facebookURL ); } }
        >
          <List.Icon name="facebook f" size="large" />
          <List.Content>Share on Facebook</List.Content>
        </List.Item>
        <List.Item
          as="a"
          href={ tweetURL }
          onClick={ ( e ) => { e.preventDefault(); sharePopup( tweetURL ); } }
          onKeyPress={ ( e ) => { e.preventDefault(); sharePopup( tweetURL ); } }
        >
          <List.Icon name="twitter" size="large" />
          <List.Content>Share on Twitter</List.Content>
        </List.Item>
      </List>
    </div>
  );
};

Share.propTypes = {
  shareLink: string,
  contentTitle: string
};

export default Share;
