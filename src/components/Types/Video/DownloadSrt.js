import React, { Component } from 'react';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import { Item } from 'semantic-ui-react';
import { array, string, func } from 'prop-types';
import withFileDownload from '../../../utils/withFileDownload';

class DownloadSrt extends Component {
  renderFormItems( units ) {
    const srts = units.filter( unit => unit.srt && unit.srt.srcUrl ).map( ( unit, i ) => this.renderFormItem( unit, i ) );
    return srts.length ? srts : 'There are no SRTs available for download at this time';
  }

  renderFormItem = ( unit, i ) => {
    const { srt, title, language } = unit;

    return (
      <div key={ `fs_${i}` } >
        <Item.Group className="download-item">
          <Item as="a" href={ this.props.downloadLink( srt.srcUrl, title, language.locale ) } >
            <Item.Image size="mini" src={ downloadIcon } className="download-icon" />
            <Item.Content>
              <Item.Header className="download-header">{ `Download ${unit.language.display_name} SRT` }</Item.Header>
              <span className="item_hover">{ `Download ${unit.language.display_name} SRT` }</span>
            </Item.Content>
          </Item>
        </Item.Group>
        <Item.Extra style={ { color: '#cd2026' } }>{ this.props.error }</Item.Extra>
      </div>
    );
  }

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

DownloadSrt.propTypes = {
  units: array,
  instructions: string,
  downloadLink: func,
  error: string
};

export default withFileDownload( DownloadSrt );
