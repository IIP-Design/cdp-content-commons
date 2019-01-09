/**
 *
 * EditSupportFileRow
 *
 */
import React, { Fragment } from 'react';
import { func, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFileRow from './selectors';
import { Button, Dropdown, Grid, Icon } from 'semantic-ui-react';

import { languages } from '../mockData';

import './EditSupportFileRow.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFileRow extends React.PureComponent {
  renderIcons = () => (
    <Fragment>
      <Button className="replace" basic>
        <Icon size="large" name="refresh" />
      </Button>
      <Button className="delete" basic>
        <Icon size="large" name="delete" />
      </Button>
    </Fragment>
  )

  render() {
    const { file, handleChange, selectedLanguage } = this.props;
    return (
      <Grid.Row>
        <Grid.Column mobile={ 7 }>{ file.file }</Grid.Column>
        <Grid.Column mobile={ 5 }>
          <Dropdown
            onChange={ handleChange }
            options={ languages }
            placeholder="Select Language"
            text={ selectedLanguage }
            value={ selectedLanguage }
            selection
          />
        </Grid.Column>
        <Grid.Column mobile={ 4 }>{ this.renderIcons() }</Grid.Column>
      </Grid.Row>
    );
  }
}

EditSupportFileRow.propTypes = {
  handleChange: func,
  file: object,
  selectedLanguage: string
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilerow: makeSelectEditSupportFileRow()
} );

export default connect( mapStateToProps, actions )( EditSupportFileRow );
