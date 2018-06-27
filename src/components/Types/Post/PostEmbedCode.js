import React from 'react';
import { string } from 'prop-types';
import EmbedCode from '../EmbedCode';
import { Checkbox, Icon, Popup } from 'semantic-ui-react';
import colors from '../../../utils/colors';

const embedPopupStyles = {
  fontSize: '12px',
  color: colors.grey,
  backgroundColor: colors.lightGrey
};

const PostEmbedCode = props => (
  <div>
    <EmbedCode instructions={ props.instructions }>
      <Checkbox className="embed_keepStyles" label="Maintain original page styling" />
      <Popup
        trigger={ <Icon name="info circle" className="embed_tooltip" /> }
        content="Check the box to embed this article with its original styling from the source site.
        Leave unchecked to embed with default styling."
        position="bottom center"
        style={ embedPopupStyles }
        className="embed_popup"
      />
    </EmbedCode>
  </div>
);

PostEmbedCode.propTypes = {
  instructions: string
};

export default PostEmbedCode;
