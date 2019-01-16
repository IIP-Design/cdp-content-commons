import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import { array, string } from 'prop-types';

class DownloadTranscript extends Component {
  renderFormItems( units ) {
    const transcripts = units
      .filter( unit => unit.transcript && unit.transcript.srcUrl )
      .map( ( unit, i ) => this.renderFormItem( unit, i ) );
    return transcripts.length ? transcripts : 'There are no transcripts available for download at this time';
  }

  renderFormItem = ( unit, i ) => (
    <Item.Group key={ `fs_${i}` } className="download-item">
      <Item
        as="a"
        href={ unit.transcript.srcUrl }
        data-action={ `downloadTranscript - ${unit.language.display_name} - ${unit.title}` }
        download={ `${unit.language.display_name}_Transcript` }
      >
        <Item.Image size="mini" src={ downloadIcon } className="download-icon" />
        <Item.Content>
          <Item.Header className="download-header">{ `Download ${unit.language.display_name} Transcript` }</Item.Header>
          <span className="item_hover">{ `Download ${unit.language.display_name} Transcript` }</span>
        </Item.Content>
      </Item>
    </Item.Group>
  );

  render() {
    const { units } = this.props;
    return (
      <div>
        <div className="form-group_instructions">{ this.props.instructions }</div>
        { units && this.renderFormItems( units ) }
      </div>
    );
  }
}

DownloadTranscript.propTypes = {
  units: array,
  instructions: string
};

export default DownloadTranscript;
