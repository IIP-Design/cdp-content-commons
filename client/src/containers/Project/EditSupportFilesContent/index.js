/**
 *
 * EditSupportFilesContent
 *
 */
import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFilesContent from './selectors';

import './EditSupportFilesContent.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFilesContent extends React.PureComponent {
  render() {
    const { fileType } = this.props;

    /**
     * Duplicate props to avoid unknown prop warning
     * @see https://reactjs.org/warnings/unknown-prop.html
     */
    const articleProps = { ...this.props };
    delete articleProps.fileType;
    delete articleProps.modalTrigger;
    delete articleProps.modalContent;
    delete articleProps.defaultAction;

    const headingStyle = {
      textTransform: ( fileType === 'srt' && 'uppercase' ) || 'capitalize'
    };

    return (
      <article className={ `${fileType}-files` } { ...articleProps }>
        <header className="header">
          <h2>Edit <span style={ headingStyle }>{ fileType }</span> files in this project</h2>
        </header>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ex, quod obcaecati molestiae porro ad maxime commodi, nesciunt ducimus soluta nihil. Voluptas temporibus nulla repellat deleniti repudiandae molestiae quos assumenda.</p>
      </article>
    );
  }
}

EditSupportFilesContent.propTypes = {
  fileType: string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilescontent: makeSelectEditSupportFilesContent()
} );

export default connect( mapStateToProps, actions )( EditSupportFilesContent );
