import React, { Component } from 'react';
import { string } from 'prop-types';
import { Button } from 'semantic-ui-react';
import './ClipboardCopy.css';

class ClipboardCopy extends Component {
  constructor( props ) {
    super( props );
    this.timeoutID = null;
    this.state = {
      label: 'Copy',
      cls: ''
    };
  }

  /**
   * CLear timer created in handleCopyClick method in the
   * event component is unmoumted before timer has completed
   */
  componentWillUnmount() {
    window.clearTimeout( this.timeoutID );
  }

  toggleCls( label = 'Copy', cls = '' ) {
    this.setState( { label, cls } );
  }


  handleCopyClick = ( e, data ) => {
    // Notify selection copied
    this.toggleCls( '✓ Copied', 'copied' );

    // select text
    this.copyInput.select();

    // Copy input value to document clipboard
    document.execCommand( 'copy' );

    // Reset button
    this.timeoutID = setTimeout( () => {
      this.toggleCls();
    }, 2500 );
  };

  handleFocus = ( e ) => {
    e.target.select();
  };

  render() {
    const { copyItem, itemAction, label } = this.props;

    return (
      <div className="clipboardcopy_wrapper">
        <div className="clipboardcopy">
          <div className="clipboardcopy_label_wrapper">
            <p className="clipboardcopy_label">{ label }</p>
          </div>
          <div className="clipboardcopy_item">
            <input
              type="text"
              defaultValue={ copyItem }
              tabIndex="-1"
              className="clipboardcopy_item_text"
              readOnly
              onFocus={ this.handleFocus }
              ref={ ( copyInput ) => { this.copyInput = copyInput; } }
            />
            <Button
              className={ this.state.cls }
              data-action={ itemAction }
              onClick={ this.handleCopyClick }
              primary
            >
              { this.state.label }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ClipboardCopy.propTypes = {
  copyItem: string,
  itemAction: string,
  label: string
};

export default ClipboardCopy;
