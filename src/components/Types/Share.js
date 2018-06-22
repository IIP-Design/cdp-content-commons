import React from 'react';
import { string } from 'prop-types';
import { List } from 'semantic-ui-react';
import './Share.css';

const Share = ( props ) => {
  const { shareLink, contentTitle } = props;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`;
  const tweet = `https://twitter.com/home?status=${contentTitle} ${shareLink}`;

  return (
    <div>
      <List horizontal className="share_list">
        <List.Item as="a" href={ facebookURL } target="_blank" >
          <List.Icon name="facebook f" size="large" />
          <List.Content>Share on Facebook</List.Content>
        </List.Item>
        <List.Item as="a" href={ tweet } target="_blank">
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
