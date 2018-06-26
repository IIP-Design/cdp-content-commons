import React, { Component } from 'react';
import { string, object } from 'prop-types';
import EmbedCode from '../EmbedCode';
import { Checkbox, Icon, Popup } from 'semantic-ui-react';
import colors from '../../../utils/colors';

const embedPopupStyles = {
  fontSize: '12px',
  color: colors.grey,
  backgroundColor: colors.lightGrey
};

class PostEmbedCode extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      keepStyles: true
    };
  }

  toggleKeepStyles = () => {
    this.setState( { keepStyles: !this.state.keepStyles } );
  };

  render() {
    return (
      <div>
        <EmbedCode
          instructions={ this.props.instructions }
          embedItem={ this.props.embedItem }
          keepStyles={ this.state.keepStyles }
        >
          <Checkbox
            checked={ this.state.keepStyles }
            onChange={ this.toggleKeepStyles }
            className="embed_keepStyles"
            label="Maintain original page styling"
          />
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
  }
}

PostEmbedCode.propTypes = {
  instructions: string,
  embedItem: object
};

export default PostEmbedCode;
