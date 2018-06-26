import React from 'react';
import { string } from 'prop-types';
import { Button } from 'semantic-ui-react';
import './ClipboardCopy.css';

const ClipboardCopy = ( props ) => {
  const handleCopyClick = ( e ) => {
    const btn = e.target;

    // Copy input value to document clipboard
    this.input.select();
    document.execCommand( 'copy' );

    // Notify selection copied
    btn.classList.add( 'copied' );
    setTimeout( () => btn.classList.remove( 'copied' ), 1000 );
  };

  const { copyItem, label } = props;
  return (
    <div className="clipboardcopy_wrapper">
      <div className="clipboardcopy">
        <div className="clipboardcopy_label_wrapper">
          <p className="clipboardcopy_label">{ label }</p>
        </div>
        <div className="clipboardcopy_item">
          <div className="ui disabled input">
            <input
              ref={ ( input ) => {
                this.input = input;
              } }
              type="text"
              value={ copyItem }
              tabIndex="-1"
              readOnly
            />
          </div>
          <Button primary content="Copy" onClick={ handleCopyClick } />
        </div>
      </div>
    </div>
  );
};

ClipboardCopy.propTypes = {
  copyItem: string,
  label: string
};

export default ClipboardCopy;
